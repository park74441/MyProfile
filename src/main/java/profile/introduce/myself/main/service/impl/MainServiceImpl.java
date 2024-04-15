package profile.introduce.myself.main.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.main.vo.MenuVo;
import profile.introduce.myself.main.vo.SampleVo;
import profile.introduce.myself.main.mapper.MainMapper;
import profile.introduce.myself.main.service.MainService;

import java.util.List;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    MainMapper mainMapper;

    @Override
    public SampleVo selectMyInfo() throws Exception {
        return mainMapper.selectMyInfo();
    }

    @Override
    public List<MenuVo> selectMenu() throws Exception {
        return mainMapper.selectMenu();
    }
}