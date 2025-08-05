'use client';

import { useState, useEffect } from 'react';
import { Course } from '@/types';
import { CreditCard, Lock, CheckCircle, ArrowLeft, QrCode, AlertCircle } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter } from 'next/navigation';
import { useEnrollmentStore } from '@/store/enrollment';

interface EnrollPaymentPageProps {
  course: Course | null;
}

export default function EnrollPaymentPage({ course }: EnrollPaymentPageProps) {
  const [qrCodeData, setQrCodeData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [selectedBank, setSelectedBank] = useState('aba');
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  const router = useRouter();
  const enrollCourse = useEnrollmentStore((state) => state.enrollCourse);
  const merchantId = process.env.NEXT_PUBLIC_ABA_MERCHANT_ID || 'YOUR_MERCHANT_ID';
  const apiKey = process.env.NEXT_PUBLIC_ABA_API_KEY || 'YOUR_API_KEY';
  const apiUrl = 'https://api.payway.com.kh';

  const banks = [
    { value: 'aba', label: 'ABA Bank' },
    { value: 'bakong', label: 'Bakong App' },
    { value: 'acleda', label: 'ACLEDA Bank' },
    { value: 'canadia', label: 'Canadia Bank' },
  ];

  useEffect(() => {
    if (!course || !selectedBank) {
      setError(selectedBank ? null : 'Please select a bank to proceed with payment.');
      return;
    }

    const generateKHQR = async () => {
      setIsProcessing(true);
      setError(null);
      try {
        const transactionData = {
          merchantId,
          amount: course.price.toFixed(2),
          currency: 'USD',
          description: `Payment for ${course.title.slice(0, 13)} via ${selectedBank}`,
          transactionId: `TXN_${Date.now()}_${selectedBank}`,
        };

        const mockQrString = `00020101021130510016abaakhppxxx@abaa0115${merchantId}0208ABA Bank5204783253038405405${course.price.toFixed(2)}5802KH5913${course.title.slice(0, 13)}6010PHNOM PENH62530107${transactionData.transactionId}6380010PAYWAY@ABA0103${selectedBank.toUpperCase()}63046DC4`;
        setQrCodeData(mockQrString);
        setTransactionId(transactionData.transactionId);
      } catch (error) {
        console.error('Error generating KHQR:', error);
        setError('Failed to generate QR code. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    };

    generateKHQR();
  }, [course, merchantId, selectedBank]);

  const checkPaymentStatus = async () => {
    if (!selectedBank) {
      setError('Please select a bank before confirming payment.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setPaymentStatus('verifying');

    try {
      let attempts = 0;
      const maxAttempts = 3;
      const pollPayment = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempts += 1;
        if (attempts >= maxAttempts) {
          throw new Error('Payment verification timed out');
        }
        return { status: 'success' };
      };

      const response = await pollPayment();
      if (response.status === 'success') {
        setPaymentStatus('success');
        if (course?.slug) {
          enrollCourse(course.slug);
        }
        setTimeout(() => {
          router.push(`/courses/${course?.slug}`);
        }, 2000);
      } else {
        throw new Error('Payment not confirmed');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setError('Payment verification failed. Please try again.');
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Available</h2>
          <p className="text-gray-600">Please select a valid course to enroll.</p>
          <button
            onClick={() => router.push('/courses')}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Browse available courses"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <button
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
              onClick={() => router.push(`/courses/${course.slug}`)}
              aria-label="Return to course page"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Course
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {course.title}
            </h2>
            <div className="flex items-center justify-start gap-3 mb-4">
              <span className="text-3xl font-extrabold text-gray-900">
                ${course.price.toFixed(2)}
              </span>
              {course.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${course.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {course.originalPrice && (
              <div className="text-red-500 font-semibold text-sm mb-4">
                {Math.round((1 - course.price / course.originalPrice) * 100)}% off
              </div>
            )}
            <div className="text-gray-600 text-sm space-y-2">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                Lifetime access
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                Access on mobile and TV
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                Certificate of completion
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pay with KHQR</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="bank-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <div className="relative">
                  <select
                    id="bank-select"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Select bank for KHQR payment"
                    disabled={isProcessing || paymentStatus === 'success'}
                  >
                    {banks.map((bank) => (
                      <option key={bank.value} value={bank.value}>
                        {bank.label}
                      </option>
                    ))}
                  </select>
                  <QrCode className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Default payment method is ABA Bank. Change to another bank if preferred.
                </p>
              </div>

              {error && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  {error}
                </div>
              )}

              {paymentStatus === 'verifying' && (
                <div className="flex items-center justify-center text-blue-600 text-sm">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-600 mr-2"></div>
                  Verifying payment...
                </div>
              )}
              {paymentStatus === 'success' && (
                <div className="flex items-center justify-center text-green-600 text-sm">
                  <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  Payment successful! Redirecting to your course...
                </div>
              )}
              {paymentStatus === 'failed' && (
                <div className="flex items-center justify-center text-red-600 text-sm">
                  <AlertCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  Payment failed. Please try again.
                </div>
              )}

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Scan the QR code below with your {banks.find((b) => b.value === selectedBank)?.label} to complete the payment.
                </p>
                {qrCodeData && selectedBank && paymentStatus !== 'success' ? (
                  <div className="flex justify-center">
                    <QRCodeCanvas
                      value={qrCodeData}
                      size={200}
                      className="border border-gray-300 p-4 rounded-lg"
                      aria-label="KHQR code for payment"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      {isProcessing ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
                      ) : (
                        <p className="text-sm text-gray-600">QR code will appear here</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {transactionId && paymentStatus !== 'success' && (
                <div className="text-center text-sm text-gray-600 mb-4">
                  Transaction ID: {transactionId}
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600">
                <Lock className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                Secure payment powered by ABA PayWay
              </div>

              <button
                onClick={checkPaymentStatus}
                disabled={isProcessing || !qrCodeData || !selectedBank || paymentStatus === 'success'}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold text-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isProcessing || !qrCodeData || !selectedBank || paymentStatus === 'success'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-blue-700 hover:to-indigo-700 hover:scale-105 focus:from-blue-700 focus:to-indigo-700 focus:scale-105'
                }`}
                aria-label={isProcessing ? 'Processing payment' : 'Confirm payment with KHQR'}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                    Checking...
                  </div>
                ) : (
                  'Confirm Payment'
                )}
              </button>

              <div className="text-center text-sm text-gray-600 font-medium">
                30-Day Money-Back Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
