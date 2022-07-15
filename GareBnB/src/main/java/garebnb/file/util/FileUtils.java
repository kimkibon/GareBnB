package garebnb.file.util;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import garebnb.common.util.CommonUtils;

@Component("fileUtils")
public class fileUtils {
	
private static final String filePath = "/Users/jinkim/Documents/upload/";
	
	public List<Map<String,Object>> parseInsertFileInfo(Map<String,Object> map, HttpServletRequest request) throws Exception{
		MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
    	Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
    	
    	MultipartFile multipartFile = null;
    	String originalFileName = null;
    	String originalFileExtension = null;
    	String storedFileName = null;
    	
    	List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        Map<String, Object> listMap = null; 
        
        String fileBoardIdx = null;
        String fileBoardLevel = "0";
        String fileBoardType = (String)map.get("FILE_BOARD_TYPE");
        
        if(map.get("BOARD_IDX")==null) {
        	fileBoardIdx = (String)map.get("MEM_IDX");
        } else {
        	fileBoardIdx = (String)map.get("BOARD_IDX");
        }
        
        if(map.get("FILE_LEVEL") != null) {
        	fileBoardLevel = (String)map.get("FILE_LEVEL");
        }
        
        
        File file = new File(filePath);
        if(file.exists() == false){
        	file.mkdirs();
        }
        
        while(iterator.hasNext()){
        	multipartFile = multipartHttpServletRequest.getFile(iterator.next());
        	if(multipartFile.isEmpty() == false){
        		originalFileName = multipartFile.getOriginalFilename();
        		originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        		storedFileName = CommonUtils.getRandomString() + originalFileExtension;
        		
        		file = new File(filePath + storedFileName);
        		multipartFile.transferTo(file);
        		
        		listMap = new HashMap<String,Object>();
        		listMap.put("FILE_BOARD_IDX", fileBoardIdx);
        		listMap.put("FILE_LEVEL", fileBoardLevel);
        		listMap.put("FILE_BOARD_TYPE", fileBoardType);
        		listMap.put("FILE_ORGNAME", originalFileName);
        		listMap.put("FILE_STDNAME", storedFileName);
        		listMap.put("FILE_SIZE", multipartFile.getSize());
        		list.add(listMap);
        	}
        }
		return list;
	}
}
