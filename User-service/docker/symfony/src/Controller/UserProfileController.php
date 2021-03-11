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
    public function getUsers() {
        $users = $this->getDoctrine()->getRepository(UserProfile::class)->findAll();
        return $this->json($users);
    }
    /**
     * @Rest\Post("/user")
     * @Rest\RequestParam(name="id")
     */
    public function getProfile(ParamFetcher $paramFetcher, SerializerInterface $serializer) {
        $profileId=$paramFetcher->get('id');
        $user = $this->getDoctrine()->getRepository(UserProfile::class)->findOneBy(['id'=>$profileId]);
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
     * @param ParamFetcher $paramFetcher
     * @return mixed|Request
     */

    public function createUser(LoggerInterface $logger, Request $request, ParamFetcher $paramFetcher, string $photoDir, SerializerInterface $serializer)
    {
        try {
        $user = new UserProfile();
        $form = $this->createForm(UserProfileType::class, $user);
        $data = $paramFetcher->all();

        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
           $photo = $paramFetcher->get('profilePhoto');
           if($photo) {
               $filename = bin2hex(random_bytes(6)).'.'.$photo->guessExtension();
               try {
                   $photo->move($photoDir, $filename);
               } catch (FileException $e) {
                   $e->getMessage();
               }
               $user->setProfileImage($filename);
           }
        }

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($user);
        $manager->flush();

        return $this->json($serializer->serialize($user, 'json'));

    }

    catch(Exception $e) {
        $logger->info('An exception ocurred!');
        $logger->error($e->getMessage());
    }

}
}
