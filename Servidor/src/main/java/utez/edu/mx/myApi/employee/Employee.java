package utez.edu.mx.myApi.employee;

import jakarta.persistence.*;
import utez.edu.mx.myApi.department.Department;
import utez.edu.mx.myApi.rol.Rol;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "user", nullable = false)
    private String user;

    @Column(name = "password", nullable = true)
    private String password;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "e_mail", nullable = false)
    private String eMail;

    @ManyToOne
    @JoinColumn(name = "id_department", nullable = false)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    public Employee() {
    }

    public Employee(String user, String password, String fullName, String eMail) {
        this.user = user;
        this.password = password;
        this.fullName = fullName;
        this.eMail = eMail;
    }

    public Employee(String user, String password, String fullName, String eMail, Department department, Rol rol) {
        this.user = user;
        this.password = password;
        this.fullName = fullName;
        this.eMail = eMail;
        this.department = department;
        this.rol = rol;
    }

    public Employee(long id, String user, String password, String fullName, String eMail, Department department, Rol rol) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.fullName = fullName;
        this.eMail = eMail;
        this.department = department;
        this.rol = rol;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}
