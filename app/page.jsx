'use client';

import { useEffect, useRef, useState } from 'react';
import ConfirmDialog from './components/ConfirmDialog';
import FundDetailModal from './components/FundDetailModal';
import NewsDetailModal from './components/NewsDetailModal';
import ActionSheet from './components/ActionSheet';
import { createWorker } from 'tesseract.js';

// --- Icons ---
function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H15V14.5H9V21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke={active ? "#38bdf8" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RefreshIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.51 9.00001C4.01717 7.56678 4.87913 6.2854 6.02107 5.30574C7.16301 4.32608 8.53447 3.69167 10.0066 3.47735C11.4787 3.26302 12.9877 3.47829 14.3487 4.09677C15.7097 4.71524 16.8631 5.70997 17.67 6.96001L23 10M1 14L6.33 17.04C7.13693 18.29 8.29029 19.2848 9.6513 19.9032C11.0123 20.5217 12.5213 20.737 13.9934 20.5227C15.4655 20.3083 16.837 19.6739 17.9789 18.6943C19.1209 17.7146 19.9828 16.4332 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 6V4C8 3.46957 8.21071 3 8.58579 2.62513C8.96086 2.25026 9.46957 2.03967 10 2.03967H14C14.5304 2.03967 15.0391 2.25026 15.4142 2.62513C15.7893 3 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function NewsIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20Z" stroke={active ? "#38bdf8" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 8H7" stroke={active ? "#38bdf8" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 12H7" stroke={active ? "#38bdf8" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 16H7" stroke={active ? "#38bdf8" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// --- Main Page Component ---
export default function HomePage() {
  const [funds, setFunds] = useState([]);
  const [view, setView] = useState('home'); // 'home' | 'sync'
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5000); // Default 5s
  const [activeTab, setActiveTab] = useState('funds'); // 'funds' | 'news'
  const [news, setNews] = useState([]);
  const [latestNewsId, setLatestNewsId] = useState(null);
  const [lastReadNewsId, setLastReadNewsId] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [pendingFunds, setPendingFunds] = useState([]); // List for OCR results
  const [selectedFund, setSelectedFund] = useState(null);

  // News Detail State
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsDetail, setShowNewsDetail] = useState(false);
  const [newsDetailLoading, setNewsDetailLoading] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showRefreshActionSheet, setShowRefreshActionSheet] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, code: null });
  const [showClearAllDialog, setShowClearAllDialog] = useState(false);

  const confirmExit = () => {
    setShowExitDialog(false);
    setPendingFunds([]);
    setManualCode('');
    setManualAmount('');
    setManualCost('');
    setManualSearchQuery('');
    setManualSearchResults([]);
    setShowSearchResults(false);
    setView('home');
    setScanning(false);
  };

  const cancelExit = () => {
    setShowExitDialog(false);
  };

  const handleClearAllFunds = () => {
    if (!funds.length) {
      setSuccessDialog({
        visible: true,
        message: '当前没有持仓基金'
      });
      return;
    }
    setShowClearAllDialog(true);
  };

  const confirmClearAllFunds = () => {
    setShowClearAllDialog(false);
    setFunds(() => {
      localStorage.removeItem('funds');
      return [];
    });
    setSelectedFund(null);
    setIsEditing(false);
  };

  const cancelClearAllFunds = () => {
    setShowClearAllDialog(false);
  };

  const fetchNewsDetail = (id) => {
    return new Promise((resolve, reject) => {
      const callbackName = `newsDetail_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const url = `https://newsinfo.eastmoney.com/kuaixun/v2/api/content/getnews?newsid=${id}&newstype=1&guid=appzxzw3a6955ac-8410-f613-62f9-ed66a9c23dd7&source=wap&version=1&language=&pkg=&callback=${callbackName}`;

      window[callbackName] = (data) => {
        delete window[callbackName];
        if (document.getElementById(callbackName)) {
          document.body.removeChild(document.getElementById(callbackName));
        }
        resolve(data);
      };

      const script = document.createElement('script');
      script.id = callbackName;
      script.src = url;
      script.onerror = () => {
        delete window[callbackName];
        if (document.getElementById(callbackName)) {
          document.body.removeChild(document.getElementById(callbackName));
        }
        reject(new Error('Fetch news detail failed'));
      };
      document.body.appendChild(script);
    });
  };

  const handleNewsClick = async (newsItem) => {
    setSelectedNews(null);
    setShowNewsDetail(true);
    setNewsDetailLoading(true);
    try {
      // Support both newsid and code (Eastmoney list usually uses code as ID)
      const id = newsItem.newsid || newsItem.code;
      const data = await fetchNewsDetail(id);
      if (data && data.news) {
        const detail = { ...data.news };
        // Map fields from list item if missing in detail
        if (!detail.title) detail.title = detail.Art_OriginalTitle;
        if (!detail.showTime) detail.showTime = newsItem.showTime;
        setSelectedNews(detail);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNewsDetailLoading(false);
    }
  };

  const handleNewsTabClick = () => {
    setActiveTab('news');
    if (latestNewsId) {
      setLastReadNewsId(latestNewsId);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState('');
  const [editReturn, setEditReturn] = useState('');
  const [pullY, setPullY] = useState(0);
  const startY = useRef(0);

  const timerRef = useRef(null);
  const fileInputRef = useRef(null);
  const listRef = useRef(null);

  const hasUnreadNews = latestNewsId && latestNewsId !== lastReadNewsId;

  // --- Pull to Refresh Logic ---
  const handleTouchStart = (e) => {
    if (window.scrollY === 0 && !refreshing) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (startY.current > 0 && !refreshing && window.scrollY === 0) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;
      if (diff > 0) {
        // Add resistance
        setPullY(Math.min(diff * 0.4, 120));
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullY > 60) {
      setPullY(60); // Keep it visible while refreshing
      await handleRefresh();
      setPullY(0);
    } else {
      setPullY(0);
    }
    startY.current = 0;
  };

  // --- Data Fetching (Restored & Enhanced) ---
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        document.body.removeChild(script);
        resolve();
      };
      script.onerror = () => {
        document.body.removeChild(script);
        reject(new Error('Load failed'));
      };
      document.body.appendChild(script);
    });
  };

  const searchFund = (keyword) => {
    return new Promise((resolve, reject) => {
      const callbackName = `jQuery_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const url = `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?callback=${callbackName}&m=1&key=${encodeURIComponent(keyword)}`;

      window[callbackName] = (data) => {
        delete window[callbackName];
        if (document.getElementById(callbackName)) {
          document.body.removeChild(document.getElementById(callbackName));
        }
        resolve(data);
      };

      const script = document.createElement('script');
      script.id = callbackName;
      script.src = url;
      script.onerror = () => {
        delete window[callbackName];
        if (document.getElementById(callbackName)) {
          document.body.removeChild(document.getElementById(callbackName));
        }
        reject(new Error('Search failed'));
      };
      document.body.appendChild(script);
    });
  };

  const fetchNews = async () => {
    return new Promise((resolve, reject) => {
      const callbackName = `jQuery_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const url = `https://np-weblist.eastmoney.com/comm/web/getFastNewsList?client=web&biz=web_724&fastColumn=102&sortEnd=&pageSize=50&req_trace=${Date.now()}&_=${Date.now()}&callback=${callbackName}`;

      window[callbackName] = (data) => {
        delete window[callbackName];
        if (document.getElementById(callbackName)) {
          document.body.removeChild(document.getElementById(callbackName));
        }
        if (data && data.code === "1" && data.data && data.data.fastNewsList) {
          const list = data.data.fastNewsList || [];
          setNews(() => list);
          if (list.length > 0) {
            const first = list[0];
            const id = first.code || first.realSort || first.showTime || null;
            if (id) {
              setLatestNewsId(prev => (prev === id ? prev : id));
            }
          }
          resolve(list);
        } else {
          resolve([]);
        }
      };

      const script = document.createElement('script');
      script.id = callbackName;
      script.src = url;
      script.onerror = () => {
        delete window[callbackName];
        if (document.getElementById(callbackName)) {
          document.body.removeChild(document.getElementById(callbackName));
        }
        reject(new Error('Fetch news failed'));
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    fetchNews();
    const intervalId = setInterval(fetchNews, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchFundData = async (c) => {
    const getTencentPrefix = (code) => {
      if (code.startsWith('6') || code.startsWith('9')) return 'sh';
      if (code.startsWith('0') || code.startsWith('3')) return 'sz';
      if (code.startsWith('4') || code.startsWith('8')) return 'bj';
      return 'sz';
    };

    // 1. Try fundgz (Real-time estimate)
    const tryFundGz = () => new Promise((resolve) => {
      const gzUrl = `https://fundgz.1234567.com.cn/js/${c}.js?rt=${Date.now()}`;
      const callbackName = `jsonpgz_${c}_${Math.random().toString(36).slice(2, 7)}`;
      const scriptGz = document.createElement('script');
      scriptGz.src = gzUrl;

      const originalJsonpgz = window.jsonpgz;
      window.jsonpgz = (json) => {
        window.jsonpgz = originalJsonpgz;
        const gszzlNum = Number(json.gszzl);
        resolve({
          code: json.fundcode,
          name: json.name,
          dwjz: json.dwjz,
          gsz: json.gsz,
          gztime: json.gztime,
          gszzl: Number.isFinite(gszzlNum) ? gszzlNum : 0
        });
        if (document.body.contains(scriptGz)) document.body.removeChild(scriptGz);
      };

      scriptGz.onerror = () => {
        window.jsonpgz = originalJsonpgz;
        if (document.body.contains(scriptGz)) document.body.removeChild(scriptGz);
        resolve(null);
      };

      document.body.appendChild(scriptGz);
      setTimeout(() => {
        if (document.body.contains(scriptGz)) {
          document.body.removeChild(scriptGz);
          resolve(null);
        }
      }, 3000);
    });

    let baseData = await tryFundGz();

    // 2. Fallback to Search API if fundgz failed (e.g. QDII funds)
    if (!baseData) {
      try {
        const searchRes = await searchFund(c);
        if (searchRes?.Datas?.length > 0) {
          const info = searchRes.Datas[0].FundBaseInfo;
          // Note: QDII funds often don't have real-time gszzl, use dwjz as proxy
          baseData = {
            code: info.FCODE,
            name: info.SHORTNAME,
            dwjz: info.DWJZ,
            gsz: info.DWJZ,
            gztime: info.FSRQ,
            gszzl: 0
          };
        }
      } catch (e) {
        console.error('Fallback search failed', e);
      }
    }

    if (!baseData) return null;

    // 3. Fetch Holdings (Eastmoney)
    const holdingsUrl = `https://fundf10.eastmoney.com/FundArchivesDatas.aspx?type=jjcc&code=${c}&topline=10&year=&month=&rt=${Date.now()}`;
    let holdings = [];
    try {
      await loadScript(holdingsUrl);
      const html = window.apidata?.content || '';
      const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
      for (const r of rows) {
        const cells = (r.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/gi) || []).map(td => td.replace(/<[^>]*>/g, '').trim());
        const codeIdx = cells.findIndex(txt => /^\d{6}$/.test(txt));
        const weightIdx = cells.findIndex(txt => /\d+(?:\.\d+)?\s*%/.test(txt));
        if (codeIdx >= 0 && weightIdx >= 0) {
          holdings.push({
            code: cells[codeIdx],
            name: cells[codeIdx + 1] || '',
            weight: cells[weightIdx],
            change: null
          });
        }
      }
      holdings = holdings.slice(0, 10);

      // Fetch Stock Quotes
      if (holdings.length) {
         const tencentCodes = holdings.map(h => `s_${getTencentPrefix(h.code)}${h.code}`).join(',');
         const quoteUrl = `https://qt.gtimg.cn/q=${tencentCodes}`;
         await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = quoteUrl;
            script.onload = () => {
               holdings.forEach(h => {
                 const varName = `v_s_${getTencentPrefix(h.code)}${h.code}`;
                 const dataStr = window[varName];
                 if (dataStr) {
                   const parts = dataStr.split('~');
                   if (parts.length > 5) h.change = parseFloat(parts[5]);
                 }
               });
               document.body.removeChild(script);
               resolve();
            };
            script.onerror = () => {
               if(document.body.contains(script)) document.body.removeChild(script);
               resolve();
            };
            document.body.appendChild(script);
         });
      }
    } catch (e) {
      console.error('Holdings fetch failed', e);
    }

    return { ...baseData, holdings };
  };

  const refreshAll = async (fundsSnapshot) => {
    if (!fundsSnapshot.length) return;

    // Store updates in a map: code -> data
    const updates = new Map();

    for (const f of fundsSnapshot) {
      try {
        const data = await fetchFundData(f.code);
        if (data) {
          updates.set(f.code, data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (updates.size > 0) {
      setFunds(current => {
        const next = current.map(f => {
          const data = updates.get(f.code);
          if (!data) return f;

          // Update dynamic values
          const updatedFund = { ...f, ...data };

          // Calculate Returns if holding info exists
          if (updatedFund.holdingAmount) {
             // 1. Today's Return (Estimated) = Holding Amount * gszzl%
             // Note: Holding Amount usually represents "Yesterday's Market Value".
             // If user entered "Current Market Value" which might already be updated, this would be recursive.
             // But standard "Add Fund" flow implies entering "Current Assets".
             // Let's assume holdingAmount is the BASE for today's calculation (Yesterday's Close).
             updatedFund.todayReturn = (updatedFund.holdingAmount * updatedFund.gszzl / 100).toFixed(2);

             // 2. Real-Time Total Return
             // If "holdingReturn" is "Accumulated Return" (Historical), then Real-Time = Historical + Today's.
             // This matches Alipay's logic where "Holding Return" updates in real-time.
             updatedFund.realTimeTotalReturn = (parseFloat(updatedFund.holdingReturn) + parseFloat(updatedFund.todayReturn)).toFixed(2);
          }
          return updatedFund;
        });

        localStorage.setItem('funds', JSON.stringify(next));
        return next;
      });
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('funds') || '[]');
    if (Array.isArray(saved)) {
      setFunds(saved);
      refreshAll(saved);
    }

    timerRef.current = setInterval(() => {
      setFunds(prev => {
        refreshAll(prev);
        return prev;
      });
    }, refreshInterval);

    return () => clearInterval(timerRef.current);
  }, [refreshInterval]);

  // --- Render Helpers ---
  const formatNumber = (value) => {
    if (value === null || value === undefined || value === '') return '0.00';
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(num)) return '0.00';
    const fixed = num.toFixed(2);
    const parts = fixed.split('.');
    const integer = parts[0];
    const decimal = parts[1] || '00';
    const sign = integer.startsWith('-') ? '-' : '';
    const intAbs = sign ? integer.slice(1) : integer;
    const intWithCommas = intAbs.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + intWithCommas + '.' + decimal;
  };

  const getTotalAssets = () => {
    return funds.reduce((acc, curr) => acc + (Number(curr.holdingAmount) || 0), 0);
  };

  const getTodayProfit = () => {
    return funds.reduce((acc, curr) => acc + (parseFloat(curr.todayReturn || 0) || 0), 0);
  };

  const getHoldingProfit = () => {
    return funds.reduce((acc, curr) => acc + (parseFloat(curr.holdingReturn || 0) || 0), 0);
  };

  const getUpDownCount = () => {
    let up = 0;
    let down = 0;
    funds.forEach((f) => {
      const val = parseFloat(f.gszzl);
      if (!Number.isFinite(val)) return;
      if (val > 0) up += 1;
      else if (val < 0) down += 1;
    });
    return { up, down };
  };

  const getLatestUpdateTime = () => {
    if (!funds.length) return '--';
    const times = funds.map(f => f.gztime).filter(t => t).sort().reverse();
    if (times.length > 0) {
      return times[0];
    }
    return '--';
  };

  const getTodayDate = () => {
    const d = new Date();
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  // --- Modal & Edit Logic ---
  const openDetail = (fund) => {
    setSelectedFund(fund);
    setIsEditing(false);
    setEditAmount(fund.holdingAmount?.toString() || '');
    setEditReturn(fund.holdingReturn?.toString() || '');
  };

  const closeDetail = () => {
    setSelectedFund(null);
    setIsEditing(false);
  };

  const handleSavePosition = () => {
    if (!selectedFund) return;

    const newAmount = parseFloat(editAmount) || 0;
    const newReturn = parseFloat(editReturn) || 0;

    // Calculate new Today Return based on new Amount
    // Today Return = Amount * gszzl%
    const todayRet = (newAmount * selectedFund.gszzl / 100).toFixed(2);
    const totalRet = (newReturn + parseFloat(todayRet)).toFixed(2);

    const updatedFund = {
      ...selectedFund,
      holdingAmount: newAmount,
      holdingReturn: newReturn,
      todayReturn: todayRet,
      realTimeTotalReturn: totalRet
    };

    // Update state
    setFunds(prev => {
      const next = prev.map(f => f.code === updatedFund.code ? updatedFund : f);
      localStorage.setItem('funds', JSON.stringify(next));
      return next;
    });

    // Update selected fund view
    setSelectedFund(updatedFund);
    setIsEditing(false);
  };

  const [manualCode, setManualCode] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const [manualCost, setManualCost] = useState('');
  const [manualSearchQuery, setManualSearchQuery] = useState('');
  const [manualSearchResults, setManualSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimeoutRef = useRef(null);

  const handleManualSearch = (val) => {
    setManualSearchQuery(val);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!val) {
      setManualSearchResults([]);
      setShowSearchResults(false);
      setManualCode('');
      return;
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await searchFund(val);
        if (res && res.Datas) {
          setManualSearchResults(res.Datas);
          setShowSearchResults(true);
        } else {
          setManualSearchResults([]);
          setShowSearchResults(false);
        }
      } catch (e) {
        console.error(e);
      }
    }, 300);
  };

  const selectManualFund = (fund) => {
    setManualCode(fund.CODE);
    setManualSearchQuery(`${fund.NAME} (${fund.CODE})`);
    setShowSearchResults(false);
  };

  const handleManualAdd = async () => {
    if (!manualCode) {
      setSuccessDialog({
        visible: true,
        message: '请先选择要添加的基金'
      });
      return;
    }

    const amount = parseFloat(manualAmount);
    if (!amount || amount <= 0) {
      setSuccessDialog({
        visible: true,
        message: '持有金额必须大于 0'
      });
      return;
    }

    if (funds.some(f => f.code === manualCode)) {
      setSuccessDialog({
        visible: true,
        message: '该基金已在持仓中，不能重复添加'
      });
      return;
    }
    setLoading(true);
    try {
      // Basic check: is it a code or name?
      // For now assume code.
      const data = await fetchFundData(manualCode);
      if (data) {
        const newFund = {
          ...data,
          holdingAmount: amount,
          holdingReturn: parseFloat(manualCost) || 0,
          todayReturn: amount * (data.gszzl / 100),
          realTimeTotalReturn: (parseFloat(manualCost) || 0) + (amount * (data.gszzl / 100))
        };

        // Format fixed
        newFund.todayReturn = newFund.todayReturn.toFixed(2);
        newFund.realTimeTotalReturn = newFund.realTimeTotalReturn.toFixed(2);

        setFunds(current => {
          const next = [newFund, ...current];
          localStorage.setItem('funds', JSON.stringify(next));
          return next;
        });

        setManualCode('');
        setManualAmount('');
        setManualCost('');
        setManualSearchQuery('');
        setManualSearchResults([]);
        setShowSearchResults(false);
        setView('home');
      } else {
        setSuccessDialog({
          visible: true,
          message: '未找到该基金信息，请输入正确的代码'
        });
      }
    } catch (e) {
      console.error(e);
      setSuccessDialog({
        visible: true,
        message: '添加失败，请稍后重试'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (code) => {
    setDeleteDialog({ visible: true, code });
  };

  const confirmDeleteFund = () => {
    if (!deleteDialog.code) return;
    const code = deleteDialog.code;
    setFunds(current => {
      const next = current.filter(f => f.code !== code);
      localStorage.setItem('funds', JSON.stringify(next));
      return next;
    });
    if (selectedFund && selectedFund.code === code) {
      setSelectedFund(null);
      setIsEditing(false);
    }
    setDeleteDialog({ visible: false, code: null });
  };

  const cancelDeleteFund = () => {
    setDeleteDialog({ visible: false, code: null });
  };

  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await refreshAll(funds);
    setRefreshing(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    try {
      // 1. Preprocess Image (Scale up for better OCR)
      const preprocessImage = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                // Scale 2x for better detail on small text
                const scale = 2;
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = () => resolve(null);
        });
      };

      const imgUrl = await preprocessImage(file);
      if (!imgUrl) throw new Error('Image processing failed');

      const worker = await createWorker('chi_sim');
      const { data: { text } } = await worker.recognize(imgUrl);
      await worker.terminate();

      console.log('OCR Result:', text);

      // Split text into lines for row-based processing
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);
      const potentialFunds = [];
      const seenNames = new Set(); // Avoid duplicates

      // Regex to match lines with Amount (e.g., "Name 1,234.56 ...")
      // Strategy: Find the first valid monetary amount in the line.
      // Everything before it is the Name. Everything after is Return/Rest.
      // Use a permissive regex for number with/without commas, requiring 2 decimal places.
      const amountRegex = /([0-9,]+\.[0-9]{2})/;

      const candidates = [];

      for (let i = 0; i < lines.length; i++) {
         const line = lines[i];
         // Skip known header/garbage lines
         if (['持有', '收益', '金额', '昨日', '名称', '排序', '全部', '定投'].some(kw => line.includes(kw) && line.length < 15)) continue;
         // Skip lines that are just "定投 ..." (often appears under fund name)
         if (line.trim().startsWith('定投')) continue;

         const match = line.match(amountRegex);
         if (match) {
            const amountStr = match[1]; // The matched amount string
            const amountIndex = match.index;

            // Extract Name (before amount)
            let rawName = line.substring(0, amountIndex).trim();

            // Look ahead: If rawName is empty or short, and previous line looked like a name part?
            // Or if name is split?
            // Current strategy: If name seems incomplete (e.g. ends with "债"), check next line for "券A" etc?
            // Actually, the issue with "景顺...债" is likely that "29,916.74" is on the same line.
            // So rawName is "景 顺 长 城 景 颐 双 利 债".
            // The "券 C" is on the NEXT line.

            // Look ahead for suffix on the next line if the name seems to be cut off
            // Or just aggressively look at the next line if it starts with "券" or "A/C"
            if (i + 1 < lines.length) {
                const nextLine = lines[i+1].trim();
                // Common suffixes or parts of fund names
                if (/^(券|A|C|E|混合|股票|指数|联接)/.test(nextLine) || /^[A-Z]$/.test(nextLine)) {
                    // It's likely a continuation
                    rawName += nextLine;
                }
            }

            // If name is too short, maybe it's on the PREVIOUS line?
            // e.g. "Some Fund Name" (Line 1) -> "C 100.00" (Line 2)
            if (rawName.length < 2 && i > 0) {
                 const prevLine = lines[i-1].trim();
                 if (!['持有', '收益', '金额', '昨日', '名称'].some(kw => prevLine.includes(kw))) {
                     rawName = prevLine + rawName;
                 }
            }

            // Clean Name: remove spaces (Chinese names often have spaces in OCR)
            let name = rawName.replace(/\s+/g, '');
            // Remove common prefixes/suffixes if attached
            name = name.replace(/持有|收益|金额|昨日/g, '');

            if (name.length < 3) continue; // Too short
            if (seenNames.has(name)) continue;

            // Extract Return (after amount)
            const rest = line.substring(amountIndex + amountStr.length);
            // Look for a signed or unsigned number in the rest
            const returnMatch = rest.match(/([+\-]?[0-9,]+\.\d{2})/);
            const returnStr = returnMatch ? returnMatch[1] : '';

            candidates.push({
               name: name,
               amount: amountStr.replace(/,/g, ''),
               return: returnStr.replace(/,/g, '')
            });
            seenNames.add(name);
         }
      }

      // Process candidates: Search for codes
      for (const cand of candidates) {
          let code = '';
          let verifiedName = cand.name;

          try {
              // Search using the cleaned name
              const res = await searchFund(cand.name);
              if (res?.Datas?.length > 0) {
                  // Advanced Matching Logic
                  // 1. Exact Name Match
                  let bestMatch = res.Datas.find(d => d.NAME === cand.name);

                  // 2. Contains Match + Suffix Check (A/C)
                  if (!bestMatch) {
                      const suffix = cand.name.match(/[A-C]$/)?.[0]; // e.g. "A" or "C"
                      if (suffix) {
                          // Find candidates containing the name AND ending with the same suffix
                          bestMatch = res.Datas.find(d =>
                             (d.NAME.includes(cand.name) || cand.name.includes(d.NAME)) &&
                             d.NAME.endsWith(suffix)
                          );
                      }
                  }

                  // 3. General Contains Match (Shortest name preferred to avoid "Related" funds)
                  if (!bestMatch) {
                      const matches = res.Datas.filter(d => d.NAME.includes(cand.name) || cand.name.includes(d.NAME));
                      if (matches.length > 0) {
                          // Sort by length difference
                          matches.sort((a, b) => Math.abs(a.NAME.length - cand.name.length) - Math.abs(b.NAME.length - cand.name.length));
                          bestMatch = matches[0];
                      }
                  }

                  // 4. Fallback to first result
                  if (!bestMatch) bestMatch = res.Datas[0];

                  code = bestMatch.CODE;
                  verifiedName = bestMatch.NAME;
              }
          } catch (e) {
              console.error(`Search failed for ${cand.name}`, e);
          }

          potentialFunds.push({
              code: code,
              name: verifiedName, // Use official name if found, else OCR name
              holdingAmount: cand.amount,
              holdingReturn: cand.return,
              isOwned: code ? funds.some(f => f.code === code) : false
          });
      }


      // Fallback: If no rows matched (maybe format is different), try finding standalone codes
      if (potentialFunds.length === 0) {
          const codes = text.match(/\d{6}/g) || [];
          if (codes.length > 0) {
             for (const c of codes) {
               if (potentialFunds.some(pf => pf.code === c)) continue;

               let name = '';
               try {
                 const res = await searchFund(c);
                 if (res?.Datas?.length > 0) name = res.Datas[0].NAME;
               } catch(e) {}

               potentialFunds.push({
                  code: c,
                  name: name || '未知基金',
                  holdingAmount: '',
                  holdingReturn: '',
                  isOwned: funds.some(f => f.code === c)
               });
             }
          }
      }

      if (potentialFunds.length > 0) {
        setPendingFunds(prev => [...potentialFunds, ...prev]);
      } else {
        setSuccessDialog({
          visible: true,
          message: '未识别到有效基金信息，请重试'
        });
      }

    } catch (err) {
      console.error('OCR Error:', err);
      setSuccessDialog({
        visible: true,
        message: '识别失败，请检查网络或重试'
      });
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSyncSave = async () => {
    if (!pendingFunds.length) {
      setSuccessDialog({
        visible: true,
        message: '没有可同步的数据'
      });
      return;
    }

    const invalidAmountFunds = pendingFunds.filter(
      f => !f.code || Number(f.holdingAmount) <= 0
    );
    const duplicateFunds = pendingFunds.filter(
      f => f.code && Number(f.holdingAmount) > 0 && funds.some(existing => existing.code === f.code)
    );
    const validFunds = pendingFunds.filter(
      f => f.code && Number(f.holdingAmount) > 0 && !funds.some(existing => existing.code === f.code)
    );

    if (invalidAmountFunds.length > 0 || duplicateFunds.length > 0) {
      const parts = [];
      if (duplicateFunds.length) parts.push(`已持有基金 ${duplicateFunds.length} 只`);
      if (invalidAmountFunds.length) parts.push(`持有金额≤0或代码缺失基金 ${invalidAmountFunds.length} 只`);
      const detail = parts.length ? `（${parts.join('，')}）` : '';
      setSuccessDialog({
        visible: true,
        message: `存在问题数据，请修改后再同步${detail}`
      });
      return;
    }

    setLoading(true);
    let addedCount = 0;
    const newFunds = [];

    try {
      for (const pf of validFunds) {
        try {
          const data = await fetchFundData(pf.code);
          if (data) {
            const amount = parseFloat(pf.holdingAmount) || 0;
            const ret = parseFloat(pf.holdingReturn) || 0;
            newFunds.push({
              ...data,
              holdingAmount: amount,
              holdingReturn: ret,
              todayReturn: (amount * (data.gszzl / 100)).toFixed(2),
              realTimeTotalReturn: (ret + (amount * (data.gszzl / 100))).toFixed(2)
            });
            addedCount++;
          }
        } catch (e) {
          console.error(pf.code, e);
        }
      }

      if (newFunds.length > 0) {
        const failedCount = validFunds.length - addedCount;

        setFunds(current => {
          const codes = new Set(newFunds.map(f => f.code));
          const kept = current.filter(f => !codes.has(f.code));
          const next = [...newFunds, ...kept];
          localStorage.setItem('funds', JSON.stringify(next));
          return next;
        });
        setPendingFunds([]);
        setManualCode('');
        setManualAmount('');
        setManualCost('');
        setManualSearchQuery('');
        setManualSearchResults([]);
        setShowSearchResults(false);
        setView('home');

        const parts = [`成功同步 ${addedCount} 个基金`];
        if (failedCount > 0) {
          parts.push(`有 ${failedCount} 个基金未能同步（数据获取失败或基金代码异常）`);
        }

        setSuccessDialog({
          visible: true,
          message: parts.join('；')
        });
      } else {
        setSuccessDialog({
          visible: true,
          message: '没有可同步的数据'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const removePending = (index) => {
    setPendingFunds(prev => prev.filter((_, i) => i !== index));
  };

  const updatePending = (index, field, value) => {
    setPendingFunds(prev => {
       const next = [...prev];
       next[index] = { ...next[index], [field]: value };
       return next;
    });
  };

  const handleExitSync = () => {
    if (pendingFunds.length > 0 || manualCode || manualAmount || manualCost || manualSearchQuery) {
       setShowExitDialog(true);
       return;
    }
    confirmExit();
  };

  const [successDialog, setSuccessDialog] = useState({ visible: false, message: '' });
  const { up: upFunds, down: downFunds } = getUpDownCount();

  if (view === 'sync') {
    return (
      <div className="container">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div className="van-nav-bar van-hairline--bottom" style={{ background: 'var(--header-bg)' }}>
          <div className="van-nav-bar__content">
            <div className="van-nav-bar__left" onClick={handleExitSync}>
              <i className="van-icon van-icon-arrow-left" style={{ fontSize: '16px', color: '#1989fa' }}></i>
            </div>
            <div className="van-nav-bar__title van-ellipsis">同步持仓</div>
          </div>
        </div>

        {pendingFunds.length > 0 ? (
          <div className="sync-list-container" style={{ padding: '12px' }}>
            <div className="sync-status-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div className="sync-success-count" style={{ display: 'flex', alignItems: 'center', color: '#07c160', fontSize: '13px' }}>
                <i className="van-icon van-icon-checked" style={{ marginRight: '4px', fontSize: '14px' }}></i>
                识别成功({pendingFunds.length})
              </div>
              <button
                className="van-button van-button--primary van-button--mini van-button--plain"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '0 10px',
                  height: '26px',
                  borderRadius: '999px',
                  borderColor: '#1989fa',
                  background: 'rgba(25,137,250,0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className="van-button__text" style={{ fontSize: '11px', color: '#1989fa' }}>+ 继续添加</span>
              </button>
            </div>

            {pendingFunds.map((pf, idx) => (
              <div key={idx} className="van-cell-group van-hairline--surround" style={{ marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', background: '#1c1c1e', border: '1px solid #2c2c2e' }}>
                 <div className="van-cell" style={{ background: 'transparent', color: '#f5f5f5' }}>
                   <div className="van-cell__title" style={{ flex: 'none', width: '100%' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 500 }}>{pf.name}</div>
                          <div style={{ fontSize: '12px', color: '#969799', marginTop: '4px' }}>
                             {pf.code ? `代码 ${pf.code}` : '未知代码'}
                             {pf.isOwned && <span className="van-tag van-tag--warning van-tag--plain" style={{ marginLeft: '6px' }}>已持有</span>}
                          </div>
                        </div>
                        <div onClick={() => removePending(idx)} style={{ padding: '4px', color: '#969799', cursor: 'pointer' }}>
                            <i className="van-icon van-icon-cross"></i>
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="van-cell van-field" style={{ background: 'transparent', padding: '10px 16px' }}>
                   <div className="van-cell__title van-field__label" style={{ width: '5em', color: '#f5f5f5' }}>
                     <span>持有金额</span>
                   </div>
                  <div className="van-cell__value van-field__value">
                    <div className="van-field__body" style={{ position: 'relative', paddingRight: pf.holdingAmount ? '28px' : undefined }}>
                      <input
                        type="number"
                        className="van-field__control"
                        placeholder="0.00"
                        value={pf.holdingAmount}
                        onChange={(e) => updatePending(idx, 'holdingAmount', e.target.value)}
                        style={{ color: '#f5f5f5' }}
                      />
                      {pf.holdingAmount && (
                        <span
                          onClick={() => updatePending(idx, 'holdingAmount', '')}
                          style={{
                            position: 'absolute',
                            right: '4px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#3a3a3c',
                            color: '#c8c9cc',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          ×
                        </span>
                      )}
                    </div>
                  </div>
                 </div>
                 <div className="van-cell van-field" style={{ background: 'transparent', padding: '10px 16px' }}>
                   <div className="van-cell__title van-field__label" style={{ width: '5em', color: '#f5f5f5' }}>
                     <span>持有收益</span>
                   </div>
                  <div className="van-cell__value van-field__value">
                    <div className="van-field__body" style={{ position: 'relative', paddingRight: pf.holdingReturn ? '28px' : undefined }}>
                      <input
                        type="number"
                        className="van-field__control"
                        placeholder="0.00"
                        value={pf.holdingReturn}
                        style={{ color: parseFloat(pf.holdingReturn) > 0 ? '#ee0a24' : (parseFloat(pf.holdingReturn) < 0 ? '#07c160' : '#f5f5f5') }}
                        onChange={(e) => updatePending(idx, 'holdingReturn', e.target.value)}
                      />
                      {pf.holdingReturn && (
                        <span
                          onClick={() => updatePending(idx, 'holdingReturn', '')}
                          style={{
                            position: 'absolute',
                            right: '4px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#3a3a3c',
                            color: '#c8c9cc',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          ×
                        </span>
                      )}
                    </div>
                  </div>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State / Manual Input
          <div className="form-section" style={{ marginTop: '20px' }}>
            <div className="van-cell-group van-cell-group--inset" style={{ background: 'transparent', margin: '0 16px', overflow: 'visible' }}>
              <div className="van-cell van-field" style={{ background: '#2c2c2e', borderRadius: '8px', marginBottom: '12px', alignItems: 'center', padding: '16px', overflow: 'visible' }}>
                <div className="van-cell__title van-field__label" style={{ width: '6.2em', color: '#f5f5f5' }}>
                  <span>基金</span>
                </div>
                <div className="van-cell__value van-field__value" style={{ overflow: 'visible', position: 'relative' }}>
                  <div className="van-field__body" style={{ position: 'relative', paddingRight: manualSearchQuery ? '28px' : undefined }}>
                    <input
                      className="van-field__control"
                      placeholder="请输入基金名称或代码"
                      value={manualSearchQuery}
                      onChange={e => handleManualSearch(e.target.value)}
                      style={{ color: '#f5f5f5' }}
                    />
                    {manualSearchQuery && (
                      <span
                        onClick={() => {
                          handleManualSearch('');
                        }}
                        style={{
                          position: 'absolute',
                          right: '4px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#3a3a3c',
                          color: '#c8c9cc',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </span>
                    )}
                  </div>
                  {/* Search Dropdown (Vant Style) */}
                  {showSearchResults && manualSearchResults.length > 0 && (
                    <div
                      className="van-popup van-popup--round van-hairline--surround"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        background: '#2c2c2e',
                        maxHeight: '240px',
                        overflowY: 'auto',
                        marginTop: '4px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        border: '1px solid #3a3a3c'
                      }}
                    >
                      <div className="van-cell-group" style={{ background: 'transparent' }}>
                        {manualSearchResults.map((fund, i) => (
                          <div
                            key={fund.CODE + i}
                            className="van-cell van-cell--clickable"
                            onClick={() => selectManualFund(fund)}
                            style={{ background: '#2c2c2e', padding: '12px 16px', borderBottom: '1px solid #3a3a3c' }}
                          >
                            <div className="van-cell__title">
                                <div style={{ color: '#f5f5f5', fontSize: '14px', fontWeight: 500 }}>{fund.NAME}</div>
                                <div className="van-cell__label" style={{ color: '#969799', marginTop: '2px' }}>{fund.CODE}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="van-cell van-field" style={{ background: '#2c2c2e', borderRadius: '8px', marginBottom: '12px', alignItems: 'center', padding: '16px' }}>
                <div className="van-cell__title van-field__label" style={{ width: '6.2em', color: '#f5f5f5' }}>
                  <span>持有金额</span>
                </div>
                <div className="van-cell__value van-field__value">
                  <div className="van-field__body" style={{ position: 'relative', paddingRight: manualAmount ? '28px' : undefined }}>
                    <input
                      className="van-field__control"
                      placeholder="请输入持有金额"
                      type="number"
                      value={manualAmount}
                      onChange={e => setManualAmount(e.target.value)}
                      style={{ color: '#f5f5f5' }}
                    />
                    {manualAmount && (
                      <span
                        onClick={() => setManualAmount('')}
                        style={{
                          position: 'absolute',
                          right: '4px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#3a3a3c',
                          color: '#c8c9cc',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="van-cell van-field" style={{ background: '#2c2c2e', borderRadius: '8px', marginBottom: '12px', alignItems: 'center', padding: '16px' }}>
                <div className="van-cell__title van-field__label" style={{ width: '6.2em', color: '#f5f5f5' }}>
                  <span>持有收益</span>
                </div>
                <div className="van-cell__value van-field__value">
                  <div className="van-field__body" style={{ position: 'relative', paddingRight: manualCost ? '28px' : undefined }}>
                    <input
                      className="van-field__control"
                      placeholder="请输入持有收益"
                      type="number"
                      value={manualCost}
                      onChange={e => setManualCost(e.target.value)}
                      style={{ color: '#f5f5f5' }}
                    />
                    {manualCost && (
                      <span
                        onClick={() => setManualCost('')}
                        style={{
                          position: 'absolute',
                          right: '4px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#3a3a3c',
                          color: '#c8c9cc',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="helper-text" style={{ padding: '16px', fontSize: '12px', color: '#969799', textAlign: 'center' }}>
               或点击下方“上传持仓页截图”上传截图，当前版本识别能力较弱，建议手动新增
            </div>
          </div>
        )}

        <div className="bottom-action-bar" style={{ padding: '24px 16px', background: 'transparent' }}>
          <div className="action-buttons" style={{ display: 'flex', gap: '16px' }}>
            <button
              className="van-button van-button--default van-button--normal van-button--block van-button--round"
              onClick={() => fileInputRef.current?.click()}
              disabled={scanning}
              style={{
                flex: 1,
                background: 'transparent',
                borderColor: '#1989fa',
                color: '#1989fa',
                height: '44px',
                fontWeight: 500
              }}
            >
              <div className="van-button__content">
                <span className="van-button__text">{scanning ? '识别中...' : '上传持仓页截图'}</span>
              </div>
            </button>
            <button
              className="van-button van-button--primary van-button--normal van-button--block van-button--round"
              onClick={pendingFunds.length > 0 ? handleSyncSave : handleManualAdd}
              disabled={loading || scanning}
              style={{
                flex: 1,
                background: 'linear-gradient(to right, #1989fa, #39b9fa)',
                border: 'none',
                height: '44px',
                fontWeight: 500,
                color: '#ffffff'
              }}
            >
              <div className="van-button__content">
                <span className="van-button__text">{loading ? '保存中...' : '完成'}</span>
              </div>
            </button>
          </div>
        </div>
        <ConfirmDialog
          visible={showExitDialog}
          title="确定要退出吗？"
          message="未保存的数据将会丢失。"
          onConfirm={confirmExit}
          onCancel={cancelExit}
        />
        <ConfirmDialog
          visible={successDialog.visible}
          title="提示"
          message={successDialog.message}
          showCancel={false}
          confirmText="知道了"
          onConfirm={() => setSuccessDialog({ visible: false, message: '' })}
          onCancel={() => setSuccessDialog({ visible: false, message: '' })}
        />
      </div>
    );
  }

  return (
    <div
      className="container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="van-nav-bar van-hairline--bottom" style={{ position: 'sticky', top: 0, zIndex: 99, background: 'var(--header-bg)', padding: '6px 12px' }}>
        <div className="van-nav-bar__content">
          <div className="van-nav-bar__title van-ellipsis">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#f5f5f5' }}>{activeTab === 'funds' ? '实时基金估值' : '7x24h 快讯'}</span>
              {activeTab === 'funds' && (
                <span style={{ fontSize: '10px', color: '#c8c9cc', fontWeight: 'normal', marginTop: '2px' }}>{getLatestUpdateTime()}</span>
              )}
            </div>
          </div>
          <div className="van-nav-bar__right">
            {activeTab === 'funds' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setShowRefreshActionSheet(true)}
                >
                  <span style={{ fontSize: '12px', marginRight: '4px', color: '#969799' }}>刷新</span>
                  <span style={{ color: '#1989fa', fontSize: '12px' }}>{refreshInterval / 1000}s</span>
                  <span style={{ fontSize: '10px', color: '#969799', marginLeft: '2px' }}>▼</span>
                </div>
                {funds.length > 0 && (
                  <div
                    style={{ fontSize: '12px', color: '#ee0a24', cursor: 'pointer' }}
                    onClick={handleClearAllFunds}
                  >
                    清空
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {activeTab === 'funds' && (
        <div className="van-cell-group van-cell-group--inset" style={{ margin: '8px 12px 6px 12px', overflow: 'hidden' }}>
          <div className="van-cell" style={{ background: '#1c1c1e', padding: '10px 12px' }}>
            <div className="van-cell__title" style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px',
                  fontSize: '11px',
                  color: '#969799'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  总资产(元) <span style={{ marginLeft: '8px', display: 'flex' }}></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ee0a24' }}>↑ {upFunds} </span>
                  <span style={{ width: '1px', height: '10px', background: '#3a3a3c' }}></span>
                  <span style={{ color: '#07c160' }}>↓ {downFunds} </span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '9px', color: '#969799', marginBottom: '2px' }}>总资产</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f5f5f5', lineHeight: 1 }}>
                    {formatNumber(getTotalAssets())}
                  </div>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '9px', color: '#969799', marginBottom: '2px' }}>最新收益</div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color:
                        parseFloat(getTodayProfit()) > 0
                          ? '#ee0a24'
                          : parseFloat(getTodayProfit()) < 0
                          ? '#07c160'
                          : '#f5f5f5'
                    }}
                  >
                    {parseFloat(getTodayProfit()) > 0 ? '+' : ''}{formatNumber(getTodayProfit())}
                  </div>
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontSize: '9px', color: '#969799', marginBottom: '2px' }}>持有收益</div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color:
                        parseFloat(getHoldingProfit()) > 0
                          ? '#ee0a24'
                          : parseFloat(getHoldingProfit()) < 0
                          ? '#07c160'
                          : '#f5f5f5'
                    }}
                  >
                    {parseFloat(getHoldingProfit()) > 0 ? '+' : ''}{formatNumber(getHoldingProfit())}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fund-list-container">
        <div
          className="pull-refresh-container"
          style={{
            height: refreshing ? 60 : pullY,
            transition: pullY === 0 ? 'height 0.3s' : 'none',
          }}
        >
           {refreshing ? (
             <div className="van-loading van-loading--circular van-loading--vertical">
                <span className="van-loading__spinner van-loading__spinner--circular" style={{ width: '24px', height: '24px' }}>
                    <svg className="van-loading__circular" viewBox="25 25 50 50">
                        <circle cx="50" cy="50" r="20" fill="none"></circle>
                    </svg>
                </span>
             </div>
           ) : (
             <span
                className="pull-arrow"
                style={{
                  transform: `rotate(${pullY > 60 ? 180 : 0}deg)`,
                  display: 'inline-block',
                  transition: 'transform 0.3s'
                }}
             >
                <i className="van-icon van-icon-down" style={{ fontSize: '22px', color: '#969799' }}></i>
             </span>
           )}
           <span className="pull-text">
             {refreshing ? '正在刷新...' : (pullY > 60 ? '释放立即刷新' : '下拉刷新')}
           </span>
        </div>
        {activeTab === 'funds' && (
          <div className="van-cell-group van-cell-group--inset" style={{ margin: '4px 10px 80px 10px', background: 'transparent' }}>
            {funds.map(f => (
              <div
                 className="van-cell van-cell--clickable"
                 key={f.code}
                 onClick={() => openDetail(f)}
                 style={{ display: 'block', padding: '10px 10px 9px 10px', marginBottom: '6px', borderRadius: '8px', background: '#1c1c1e' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ overflow: 'hidden', marginRight: '8px' }}>
                    <div className="van-ellipsis" style={{ fontSize: '13px', fontWeight: 500, color: '#f5f5f5' }}>{f.name}</div>
                    <div style={{ fontSize: '9px', color: '#969799', marginTop: '1px' }}>{f.code}</div>
                  </div>
                  <div
                    className={
                      f.gszzl > 0
                        ? 'van-tag van-tag--danger'
                        : f.gszzl < 0
                        ? 'van-tag van-tag--success'
                        : 'van-tag'
                    }
                    style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      minWidth: '52px',
                      justifyContent: 'center',
                      background: f.gszzl === 0 ? '#3a3a3c' : undefined,
                      color: f.gszzl === 0 ? '#f5f5f5' : undefined
                    }}
                  >
                    {f.gszzl > 0 ? '+' : ''}{f.gszzl}%
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '9px', color: '#969799' }}>持有金额</div>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#f5f5f5', marginTop: '1px' }}>{formatNumber(f.holdingAmount || 0)}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: '#969799' }}>最新收益</div>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        marginTop: '1px',
                        color:
                          parseFloat(f.todayReturn) > 0
                            ? '#ee0a24'
                            : parseFloat(f.todayReturn) < 0
                            ? '#07c160'
                            : '#f5f5f5'
                      }}
                    >
                      {parseFloat(f.todayReturn) > 0 ? '+' : ''}{formatNumber(f.todayReturn || 0)}
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ fontSize: '9px', color: '#969799' }}>持有收益</div>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        marginTop: '1px',
                        color:
                          parseFloat(f.holdingReturn) > 0
                            ? '#ee0a24'
                            : parseFloat(f.holdingReturn) < 0
                            ? '#07c160'
                            : '#f5f5f5'
                      }}
                    >
                      {parseFloat(f.holdingReturn) > 0 ? '+' : ''}{formatNumber(f.holdingReturn || 0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'news' && (
          <div className="van-list" style={{ paddingBottom: '80px' }}>
             {news.map((item, idx) => (
               <div
                 key={idx}
                 className="van-cell van-cell--clickable"
                 onClick={() => handleNewsClick(item)}
                 style={{ padding: '16px', background: '#1c1c1e', marginBottom: '1px' }}
               >
                <div style={{ marginRight: '12px', fontSize: '11px', color: '#969799', whiteSpace: 'nowrap', paddingTop: '2px' }}>
                    {item.showTime.split(' ')[1].substring(0, 5)}
                 </div>
                 <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '1.5',
                        color: item.titleColor == 3 ? '#ee0a24' : '#f5f5f5',
                        marginBottom: '6px'
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                       style={{
                         fontSize: '12px',
                         lineHeight: '1.5',
                         color: item.titleColor == 3 ? 'rgba(238, 10, 36, 0.8)' : '#969799',
                         display: '-webkit-box',
                         WebkitLineClamp: 3,
                         WebkitBoxOrient: 'vertical',
                         overflow: 'hidden'
                       }}
                    >
                      {item.summary}
                    </div>
                 </div>
               </div>
             ))}
             {news.length === 0 && (
               <div className="van-empty">
                 <div className="van-empty__image">
                   <img src="https://img01.yzcdn.cn/vant/empty-image-default.png" alt="empty" />
                 </div>
                 <p className="van-empty__description">加载中...</p>
               </div>
             )}
          </div>
        )}
      </div>

      <div className="van-tabbar van-tabbar--fixed van-hairline--top-bottom safe-area-inset-bottom" style={{ zIndex: 100, background: '#1c1c1e' }}>
         <div className={`van-tabbar-item ${activeTab === 'funds' ? 'van-tabbar-item--active' : ''}`} onClick={() => setActiveTab('funds')} style={{ cursor: 'pointer', color: activeTab === 'funds' ? '#1989fa' : '#646566', background: 'transparent' }}>
           <div className="van-tabbar-item__icon">
             <HomeIcon active={activeTab === 'funds'} />
           </div>
           <div className="van-tabbar-item__text">持仓</div>
         </div>
         <div className="van-tabbar-item" onClick={() => setView('sync')} style={{ cursor: 'pointer', color: '#646566', background: 'transparent' }}>
           <div className="van-tabbar-item__icon">
              <PlusIcon />
           </div>
           <div className="van-tabbar-item__text">添加</div>
         </div>
         <div className={`van-tabbar-item ${activeTab === 'news' ? 'van-tabbar-item--active' : ''}`} onClick={handleNewsTabClick} style={{ cursor: 'pointer', color: activeTab === 'news' ? '#1989fa' : '#646566', background: 'transparent' }}>
            <div className="van-tabbar-item__icon" style={{ position: 'relative' }}>
              <NewsIcon active={activeTab === 'news'} />
              {hasUnreadNews && (
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#ee0a24'
                  }}
                ></span>
              )}
            </div>
            <div className="van-tabbar-item__text">快讯</div>
         </div>
      </div>

      <ActionSheet
        visible={showRefreshActionSheet}
        title="选择刷新间隔"
        actions={[
            { name: '5秒', value: 5000, color: refreshInterval === 5000 ? '#1989fa' : '#f5f5f5' },
            { name: '10秒', value: 10000, color: refreshInterval === 10000 ? '#1989fa' : '#f5f5f5' },
            { name: '20秒', value: 20000, color: refreshInterval === 20000 ? '#1989fa' : '#f5f5f5' },
        ]}
        onSelect={(action) => {
            setRefreshInterval(action.value);
            setShowRefreshActionSheet(false);
        }}
        onCancel={() => setShowRefreshActionSheet(false)}
      />

      <FundDetailModal
        visible={!!selectedFund}
        fund={selectedFund}
        onClose={closeDetail}
        onDelete={handleDelete}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editAmount={editAmount}
        setEditAmount={setEditAmount}
        editReturn={editReturn}
        setEditReturn={setEditReturn}
        onSavePosition={handleSavePosition}
      />

      <NewsDetailModal
        visible={showNewsDetail}
        news={selectedNews}
        loading={newsDetailLoading}
        onClose={() => setShowNewsDetail(false)}
      />

      <ConfirmDialog
        visible={deleteDialog.visible}
        title="确认删除"
        message="确认删除该基金吗？"
        onConfirm={confirmDeleteFund}
        onCancel={cancelDeleteFund}
      />

      <ConfirmDialog
        visible={showClearAllDialog}
        title="清空持仓"
        message="将删除所有持仓基金，且不可恢复，是否继续？"
        onConfirm={confirmClearAllFunds}
        onCancel={cancelClearAllFunds}
      />

      {/* Bottom Tab Bar Removed - Merged into bottom-nav */}
    </div>
  );
}
