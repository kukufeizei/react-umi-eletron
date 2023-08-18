/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { SalesInfoData } from '@/api/model/salesModel';
import type { ResultInfoDataSingle } from '@/api/model/quoteModel';
const global = () => {
  const [valText, setValText] = useState<object>({});
  const [upStreamEnquiryNo, setUpStreamEnquiryNo] = useState<string | null>(null);
  const [user, setUser] = useState<object>({});
  const [quoteData, setQuoteData] = useState<ResultInfoDataSingle | undefined>(undefined);
  const [currentOrderNo, setCurrentOrderNo] = useState<string | undefined>(undefined);
  const [orderData, setOrderData] = useState<SalesInfoData | undefined>(undefined);
  const [dtSessionId, setDtSessionId] = useState<string | null>(
    localStorage.getItem('dt_sessionId') || null,
  );
  return {
    user,
    setUser,
    dtSessionId,
    setDtSessionId,
    quoteData,
    setQuoteData,
    valText,
    setValText,
    orderData,
    setOrderData,
    upStreamEnquiryNo,
    setUpStreamEnquiryNo,
    currentOrderNo,
    setCurrentOrderNo,
  };
};

export default global;
