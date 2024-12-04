package utez.edu.mx.myApi.department;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import utez.edu.mx.myApi.Article.Article;
import utez.edu.mx.myApi.Category.Category;
import utez.edu.mx.myApi.employee.Employee;
import utez.edu.mx.myApi.rol.Rol;

import java.util.List;

@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "department")
    @JsonIgnore
    private List<Employee> employees;

    @ManyToOne()
    @JoinColumn(name = "id_category", nullable = false)
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "department_has_articles",
            joinColumns = @JoinColumn(name = "id_department"),
            inverseJoinColumns = @JoinColumn(name = "id_article")
    )
    private List<Article> articles;


    public Department() {
    }

    public Department(String name) {
        this.name = name;
    }

    public Department(String name, List<Employee> employees, Category category, List<Article> articles, List<Rol> roles) {
        this.name = name;
        this.employees = employees;
        this.category = category;
        this.articles = articles;
    }

    public Department(int id, String name, List<Employee> employees, Category category, List<Article> articles, List<Rol> roles) {
        this.id = id;
        this.name = name;
        this.employees = employees;
        this.category = category;
        this.articles = articles;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }


}
