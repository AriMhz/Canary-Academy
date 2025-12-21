/**
 * TypeScript interfaces for admin components
 * Provides type safety for admission applications and other admin data
 */

// Admission status type
export type AdmissionStatus = 'pending' | 'approved' | 'rejected' | 'reviewed';

// Admission application from database
export interface AdmissionApplication {
    _id: string;
    id?: string; // Alias for _id when mapped
    firstName: string;
    middleName?: string;
    lastName: string;
    gender?: string;
    gradeApplying: string;
    parentName: string;
    relationship?: string;
    email: string;
    phone: string;
    address?: string;
    additionalInfo?: string;
    agreeTerms: boolean;
    status: AdmissionStatus;
    submittedAt: string;
    documents?: string[];
}

// Mapped application for UI display
export interface MappedApplication {
    id: string;
    studentName: string;
    grade: string;
    parentName: string;
    email: string;
    phone: string;
    date: string;
    status: AdmissionStatus;
}

// Contact message from database
export interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    submittedAt: string;
}

// News item
export interface NewsItem {
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content?: string;
    image: string;
    videoUrl?: string;
}

// Gallery image
export interface GalleryImage {
    id: number;
    title: string;
    category: string;
    image: string;
}

// Article
export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    image: string;
    videoUrl?: string;
    excerpt: string;
    category?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

// Login response
export interface LoginResponse {
    success: boolean;
    token?: string;
    expiresAt?: number;
    error?: string;
    remainingAttempts?: number;
    lockoutRemaining?: number;
}

// Session data stored in sessionStorage
export interface AdminSession {
    token: string;
    expiresAt: number;
}
