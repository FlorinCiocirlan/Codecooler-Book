<?php

    namespace App\Controller;

    use App\Entity\UserProfile;
    use Doctrine\DBAL\Exception;
    use Psr\Log\LoggerInterface;
    use App\Form\UserProfileType;
    use FOS\RestBundle\Controller\AbstractFOSRestController;
    use FOS\RestBundle\Controller\Annotations as Rest;
    use FOS\RestBundle\Request\ParamFetcher;
    use Symfony\Component\HttpFoundation\File\Exception\FileException;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Serializer\SerializerInterface;
    use Aws\S3\S3Client;

    /**
     * Class UserProfileController
     *
     * @package App\Controller
     * @Route("/user-service" , name="api_users")
     */
    class UserProfileController extends AbstractFOSRestController
    {

        /**
         * @Rest\Get("/users")
         */
        public function getUsers()
        {
            $users = $this->getDoctrine()->getRepository(UserProfile::class)->findAll();

            return $this->json($users);
        }

        /**
         * @Rest\Post("/get-user")
         * @Rest\RequestParam(name="userId")
         */
        public function getProfile(ParamFetcher $paramFetcher, SerializerInterface $serializer)
        {
            $userId = $paramFetcher->get('userId');
            $user = $this->getDoctrine()->getRepository(UserProfile::class)->findOneBy(['user_id' => $userId]);

            return $this->json($serializer->serialize($user, 'json'));
        }

        /**
         *
         * @Rest\Post("/create")
         * @Rest\FileParam(image=true, nullable=false , name="profilePhoto")
         * @Rest\RequestParam(name="firstName", nullable=false )
         * @Rest\RequestParam(name="lastName", nullable=false)
         * @Rest\RequestParam(name="age", nullable=false)
         * @Rest\RequestParam(name="country", nullable=false)
         * @Rest\RequestParam(name="city", nullable=false)
         * @Rest\RequestParam(name="userId", nullable=false)
         * @param ParamFetcher $paramFetcher
         * @return mixed|Request
         */

        public function createUser(
            LoggerInterface $logger,
            Request $request,
            ParamFetcher $paramFetcher,
            string $photoDir,
            SerializerInterface $serializer,
            S3Client $awsUploader
        ) {

            $bucket = 'codecooler';

            try {
                $user = new UserProfile();
                $form = $this->createForm(UserProfileType::class, $user);
                $data = $paramFetcher->all();

                $form->submit($data);
                if ($form->isSubmitted() && $form->isValid()) {
                    $photo = $paramFetcher->get('profilePhoto');
                    if ($photo) {
                        $extension = $photo->guessExtension();
                        $filename = bin2hex(random_bytes(6)).'.'.$extension;
                        try {
                            $photo->move($photoDir, $filename);
                            $awsUploader->putObject(
                                ['Bucket' => $bucket, 'Key' => $filename, 'SourceFile' => $photoDir.'/'.$filename]
                            );
                        } catch (FileException $e) {
                            $e->getMessage();
                        }
                        $user->setProfileImage($filename);
                    }
                }

                $manager = $this->getDoctrine()->getManager();
                $manager->persist($user);
                $manager->flush();


            } catch (Exception $e) {
                return $e;
            }
                return $this->json($serializer->serialize($user, 'json'));

        }
    }
