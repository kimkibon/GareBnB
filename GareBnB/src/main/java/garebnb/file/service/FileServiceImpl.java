package garebnb.file.service;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import garebnb.file.dao.FileDAO;

@Service("fileService")
public class FileServiceImpl implements FileService{
	
	Logger log = Logger.getLogger(this.getClass());

	@Resource(name="fileDAO")
	private FileDAO fileDAO;
}
