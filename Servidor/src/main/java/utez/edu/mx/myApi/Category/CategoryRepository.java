package utez.edu.mx.myApi.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import utez.edu.mx.myApi.department.Department;

import java.util.List;


@Repository
public interface CategoryRepository extends  JpaRepository<Category, Long>{
    List<Category> findAll();
    Category findById(long id);
    Category save(Category category);

    @Modifying
    @Query(value = "DELETE from category where id = :id", nativeQuery = true)
    void deleteById(@Param("id") long id);

}


