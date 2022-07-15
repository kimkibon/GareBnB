package garebnb.member.dao;

import java.util.List;
import java.util.Map;


public interface MemberDAO {
	
	public int selectMemberDetail(Map<String,Object> map) throws Exception; 

	public void insertMember(Map<String,Object> map) throws Exception;

	public void updateOneMember(Map<String,Object> map) throws Exception;
	
	public void updateOneMemberDelete(Map<String,Object> map) throws Exception;
	
	public List<Map<String, Object>> selectMemberList(Map<String,Object> map) throws Exception; 
	
	public List<Map<String, Object>> selectHostConfirmList(Map<String,Object> map) throws Exception; 
	
	public Map<String, Object> selectConfirmMemberDetail(Map<String,Object> map) throws Exception; 
	
	public void updateMemberDeny(Map<String,Object> map) throws Exception; 

	public void updateHostConfirm(Map<String,Object> map) throws Exception; 
	
	public void updateHostDeny(Map<String,Object> map) throws Exception; 

}
