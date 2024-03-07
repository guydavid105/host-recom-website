package com.example.springbootdatabaseconn.services;

import com.example.springbootdatabaseconn.repositories.entityRepository;
import org.springframework.stereotype.Service;
import com.example.springbootdatabaseconn.models.entity;
import java.util.List;

@Service
public class entityService {
    private final entityRepository entityRepository;

    public entityService (entityRepository entityRepository) {
        this.entityRepository = entityRepository;
    }

    public List<entity> getAllEntitiesById(Long id) {
         return entityRepository.findEntitiesByPersonId(id);
    }

    public List<entity> get15RecommendationsByPersonId(Long user_id) {
        return entityRepository.findRecommendationsByPersonId(user_id);
    }

    public List<entity> get15RecommendationsByPersonIdNoWeights(Long user_id) {
        return entityRepository.findRecommendationsByPersonIdNoWeights(user_id);
    }

    public List<entity> getSongByTitle(String title) {
        return entityRepository.findSongByTitle(title);
    }

    public List<entity> getMovieByTitle(String title) {
        return entityRepository.findMovieByTitle(title);
    }

    public List<entity> getBookByTitle(String title) {
        return entityRepository.findBookByTitle(title);
    }

    public List<entity> getMovieRecommendations(Long user_id) {
        return entityRepository.findMovieRecommendations(user_id);
    }

    public List<entity> getBookRecommendations(Long user_id) {
        return entityRepository.findBookRecommendations(user_id);
    }

    public List<entity> getSongRecommendations(Long user_id) {
        return entityRepository.findSongRecommendations(user_id);
    }

    public List<entity> getSongRecommendationsNoId(List<String> titles) {
        return entityRepository.findSongRecommendationsNoIds(titles);
    }

    public List<entity> getMovieRecommendationsNoId(List<String> titles) {
        return entityRepository.findMovieRecommendationsNoIds(titles);
    }

    public List<entity> getBookRecommendationsNoId(List<String> titles) {
        return entityRepository.findBookRecommendationsNoIds(titles);
    }
}
