package profile.introduce.myself;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import profile.introduce.myself.career.service.CareerService;

import java.security.MessageDigest;

@SpringBootTest
class MyselfApplicationTests {

    @Autowired
    CareerService careerService;

    public String encode(CharSequence rawPassword) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
            md.update(((String) rawPassword).getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        byte[] pwd = md.digest();  // 배열 pwd : 문자열 str이 암호화된 32바이트 크기의 배열
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < pwd.length; i++) {
            sb.append(String.format("%2X", pwd[i])); // %2X(2자리 16진수(0~F))
        }
        return sb.toString();
    }

    @Test
    public void testQuery(){
        System.out.println(careerService.getCareerList("ABCD"));
    }
}
