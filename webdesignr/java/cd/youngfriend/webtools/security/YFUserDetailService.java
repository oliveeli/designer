package cd.youngfriend.webtools.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@SuppressWarnings("deprecation")
public class YFUserDetailService  implements UserDetailsService {

	@Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
		String userName = "admin";
		String userPassword = "yf";
		if(userName==null || userName.trim().equals("") || userPassword==null || userPassword.trim().equals("")){
			throw new UsernameNotFoundException("not such user!");
		}
		if(!userName.equals(username)){
			throw new UsernameNotFoundException(username + "user not found!");
		}
		
        Collection<GrantedAuthority> auths=new ArrayList<GrantedAuthority>();
        auths.add(new GrantedAuthorityImpl("ROLE_USER"));
        
        User user = new User(username,
        		userPassword, true, true, true, true, auths);
        
        return user;
    }
    
}