package com.group.service;

import com.group.dao.entity.User;

/**
 * Created by Neil on 2017/4/6.
 */
public interface IUserService {

    public User getUserById(int userId);
}