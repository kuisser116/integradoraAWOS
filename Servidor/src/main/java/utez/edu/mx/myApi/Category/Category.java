package utez.edu.mx.myApi.Category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import utez.edu.mx.myApi.Article.Article;
import utez.edu.mx.myApi.department.Department;

import java.util.List;

@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Department> departments;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Article> articles;

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

    public Category(String name, List<Department> departments, List<Article> articles) {
        this.name = name;
        this.departments = departments;
        this.articles = articles;
    }

    public Category(int id, String name, List<Department> departments, List<Article> articles) {
        this.id = id;
        this.name = name;
        this.departments = departments;
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

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}
