package com.example.springbootdatabaseconn.repositories;

import com.example.springbootdatabaseconn.models.person;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonRepository extends Neo4jRepository<person, Long>{
    @Query("MATCH (p:person)-[:likes]->(e:entity) WHERE e.title = $title RETURN p")
    List<person> findPeopleByEntityTitle(@Param("title") String title);

    @Query("MATCH (p:person) WHERE p.letterboxd_id = $letterboxd_id RETURN p")
    List<person> findPersonByLetterboxdId(@Param("letterboxd_id") String letterboxd_id);

    @Query("MATCH (p:person) WHERE p.spotify_id = $spotify_id RETURN p")
    List<person> findPersonBySpotifyId(@Param("spotify_id") String spotify_id);

    @Query("MATCH (p:person) WHERE p.goodreads_id = $goodreads_id RETURN p")
    List<person> findPersonByGoodreadsId(@Param("goodreads_id") String goodreads_id);
}
