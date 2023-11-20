import express, { Response } from 'express';

export const SuccessHandler = (res: Response, statusCode: number, data: any) => {
    return res.status(statusCode).json({
        success: true,
        data
    });
}

export const ErrorHandler = (res: Response, statusCode: number, data: any) => {
    return res.status(statusCode).json({
        success: false,
        data
    });
}