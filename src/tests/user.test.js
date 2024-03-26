/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.test.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ant <ant@student.42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/03/26 23:07:54 by ant               #+#    #+#             */
/*   Updated: 2024/03/26 23:08:22 by ant              ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const request = require('supertest');
const DataTypes  = require('sequelize');
const app = require('../../app');
const defineUserModel = require('../database/models/user');
const sequelize = require('../database/controller');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

const User = new defineUserModel(sequelize, DataTypes);

describe('User API', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users/register/')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password123!'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.email).toBe('test@example.com');
        expect(response.body.name).toBe('Test User');
    });
});

describe('User API', () => {
    it('should create a new user without name', async () => {
        const response = await request(app)
            .post('/users/register/')
            .send({
                email: 'test1@example.com',
                password: 'Password123!'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.email).toBe('test1@example.com');
        expect(response.body.name).toBe(null);
    });
});

describe('User API', () => {
    it('should create and get fail due to incorrect email', async () => {
        const response = await request(app)
            .post('/users/register/')
            .send({
                email: 'test1@',
                password: 'Password123!'
            });
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Validation error: Validation isEmail on email failed');
    });
});

describe('User API', () => {
    it('should create and get fail due to invalid password', async () => {
        const response = await request(app)
            .post('/users/register/')
            .send({
                email: 'test@ex.com',
                password: '123'
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Password does not meet the security requirements.');
    });
});

describe('User API', () => {
    it('should log in an existing user', async () => {
        await request(app)
            .post('/users/register/')
            .send({
                name: 'Login User',
                email: 'login@example.com',
                password: 'Password123!'
            });
        
        const response = await request(app)
            .post('/users/login/')
            .send({
                email: 'login@example.com',
                password: 'Password123!'
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });
});

describe('User API', () => {
    it('should log in failed due to bad creditinals', async () => {
        await request(app)
            .post('/users/register/')
            .send({
                name: 'Login User',
                email: 'login@example.com',
                password: 'Password123!'
            });
        
        const response = await request(app)
            .post('/users/login/')
            .send({
                email: 'login@example.com',
                password: '123'
            });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid password');
    });
});