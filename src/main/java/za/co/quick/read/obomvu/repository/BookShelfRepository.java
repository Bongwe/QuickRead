package za.co.quick.read.obomvu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.co.quick.read.obomvu.model.BookShelf;


@Repository
public interface BookShelfRepository extends JpaRepository<BookShelf, Long> {

}
