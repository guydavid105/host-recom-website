package com.example.springbootdatabaseconn.services;

import com.example.springbootdatabaseconn.repositories.PersonRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import com.example.springbootdatabaseconn.models.person;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<person> getAllPeople() {
        return personRepository.findAll();
    }

    public List<person> getPeopleByEntityId(String title) {
        return personRepository.findPeopleByEntityTitle(title);
    }

    public List<person> getPersonByLetterboxdId(String letterboxd_id) {
        return personRepository.findPersonByLetterboxdId(letterboxd_id);
    }

    public List<person> getPersonBySpotifyId(String spotify_id) {
        return personRepository.findPersonBySpotifyId(spotify_id);
    }

    public List<person> getPersonByGoodreadsId(String goodreads_id) {
        return personRepository.findPersonByGoodreadsId(goodreads_id);
    }
}
