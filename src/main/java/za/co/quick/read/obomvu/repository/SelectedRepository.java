package za.co.quick.read.obomvu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.co.quick.read.obomvu.model.Opponent;
import za.co.quick.read.obomvu.model.SelectedOpponent;

@Repository
public interface SelectedRepository extends JpaRepository<SelectedOpponent, Long> {

}
