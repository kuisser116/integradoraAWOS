package utez.edu.mx.myApi.department;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import utez.edu.mx.myApi.Article.Article;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findAll();
    Department findById(long id);
    Department save(Department department);

    @Modifying
    @Query(value = "DELETE from department where id = :id", nativeQuery = true)
    void deleteById(@Param("id") long id);
}
