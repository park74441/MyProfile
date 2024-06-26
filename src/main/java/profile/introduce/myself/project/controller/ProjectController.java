package profile.introduce.myself.project.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.project.service.ProjectService;
import profile.introduce.myself.project.vo.ProjectDetailVo;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/project/{alias}")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @RequestMapping("{projectDetailSeq}")
    Map<String, Object> getProjectDetails(@PathVariable("alias") String alias, @PathVariable("projectDetailSeq") int projectDetailSeq, HttpServletRequest request) {

        Map<String, Object> result = new HashMap<>();

        if(request.getMethod().equals("GET")){
            log.debug("프로젝트 조회 :: " + alias + " -> seq : " + projectDetailSeq);
            ProjectDetailVo projectDetailList = projectService.getProjectDetail(alias, projectDetailSeq);

            result.put("projectDetailList", projectDetailList);
        }

        return result;
    }

}
