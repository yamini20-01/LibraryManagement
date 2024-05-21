package com.FullStackApp.LibraryManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.FullStackApp.LibraryManagement.Entity.Book;
public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByGenre(String category);


	Book findByTitle(String name);

	List<Book> findByAuthor(String author);
}
