package com.group.service.impl;

import com.group.dao.UserMapper;
import com.group.dao.entity.User;
import com.group.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Neil on 2017/4/6.
 */
@Service("userService")
public class UserServiceImpl implements IUserService {

    @Resource
    private UserMapper userDao;

    public User getUserById(int userId) {
        return this.userDao.get(userId);
    }

}