package utez.edu.mx.myApi.Article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAll();
    Article findById(long id);
    Article save(Article a);

    @Modifying
    @Query(value = "DELETE from article where id = :id", nativeQuery = true)
    void deleteById(@Param("id") long id);
}
