package za.co.quick.read.obomvu;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;
import za.co.quick.read.obomvu.model.Account;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AccountControllerIntegrationTest {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@Test
	public void contextLoads() {

	}

	/*@Test
	public void testGetAllAcoounts() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);

		ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/Account",
				HttpMethod.GET, entity, String.class);
		
		assertNotNull(response.getBody());
	}

	@Test
	public void testGetAcoountById() {
		Account employee = restTemplate.getForObject(getRootUrl() + "/account/1", Account.class);
		System.out.println(employee.getName());
		assertNotNull(employee);
	}

	@Test
	public void testCreateAcoount() {
		Account account = new Account();
		//employee.setName("admin@gmail.com");
		account.setName("admin");
		account.setAge(22);

		ResponseEntity<Account> postResponse = restTemplate.postForEntity(getRootUrl() + "/account", account, Account.class);
		assertNotNull(postResponse);
		assertNotNull(postResponse.getBody());
	}

	@Test
	public void testUpdateEmployee() {
		int id = 1;
		Account account = restTemplate.getForObject(getRootUrl() + "/account/" + id, Account.class);
		account.setName("admin1");
		account.setAge(22);

		restTemplate.put(getRootUrl() + "/account/" + id, account);

		Account updatedEmployee = restTemplate.getForObject(getRootUrl() + "/account/" + id, Account.class);
		assertNotNull(updatedEmployee);
	}

	@Test
	public void testDeleteEmployee() {
		int id = 2;
		Account employee = restTemplate.getForObject(getRootUrl() + "/account/" + id, Account.class);
		assertNotNull(employee);

		restTemplate.delete(getRootUrl() + "/account/" + id);

		try {
			employee = restTemplate.getForObject(getRootUrl() + "/account/" + id, Account.class);
		} catch (final HttpClientErrorException e) {
			assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
		}
	}*/
}
