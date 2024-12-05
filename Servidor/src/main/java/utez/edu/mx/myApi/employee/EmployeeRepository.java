package utez.edu.mx.myApi.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findAll();
    Employee findById(long id);
    Employee save(Employee e); // guardar y actualizar
    @Modifying
    @Query(value = "DELETE FROM employee WHERE id = :id", nativeQuery = true)
    void deleteById(@Param("id") long id);

    // Buscar usuario por usuario/correo y contraseña
    @Query(value = "SELECT * FROM employee " +
            "WHERE password = :password " +
            "AND (e_mail = :username OR user = :username);",
            nativeQuery = true)
    Employee findByPasswordAndEmailOrUsername(
            @Param("password") String password,
            @Param("username") String username
    );

    /*// Buscar usuario por nombre de usuario
    User findByUsername(String username);*/

    @Query(value = "SELECT * FROM employee WHERE user = :username OR e_mail = :username", nativeQuery = true)
    Employee findByUser(@Param("username") String username);


}
