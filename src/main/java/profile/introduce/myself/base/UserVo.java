package profile.introduce.myself.base;

import lombok.Data;

@Data
public class UserVo {
    private String name;
    private String password;
    private String birthYear;
    private String sex;
    private String addr;
    private String addrDetail;
    private String simpleIntroduceMyself;
    private String detailIntroduceMyself;
    private String image;
}