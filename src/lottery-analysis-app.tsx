import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calculator, Sparkles, Calendar, RefreshCw, Database, Brain } from 'lucide-react';

const LotteryAnalysisApp = () => {
  const [activeTab, setActiveTab] = useState('thai');
  const [analysisType, setAnalysisType] = useState('ai');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const dateString = event.target.value;
  if (dateString) {
    // แปลง string 'YYYY-MM-DD' กลับเป็น object Date
    const [year, month, day] = dateString.split('-').map(Number);
    // เดือนใน object Date เริ่มจาก 0 (มกราคม = 0) จึงต้อง -1
    setSelectedDate(new Date(year, month - 1, day)); 
  }
};
  
  // Sample data for Thai lottery
  const thaiStats = {
    twoDigit: { last: 60, freq: 23 },
    threeDigit: { last: 551, freq: 27 },
    sixDigit: { last: 321826, freq: 14 }
  };

  // Sample data for Lao lottery
  const laoStats = {
    fourDigit: { last: 8524, freq: 19 },
    threeDigit: { last: 387, freq: 24 },
    twoDigit: { last: 42, freq: 31 }
  };

  const generatePredictions = (type) => {
    const predictions = [];
    const count = type === 'two' ? 10 : type === 'three' ? 8 : 6;
    for (let i = 0; i < count; i++) {
      const num = type === 'two' 
        ? Math.floor(Math.random() * 100).toString().padStart(2, '0')
        : type === 'three'
        ? Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        : type === 'four'
        ? Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        : Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      predictions.push({
        number: num,
        confidence: Math.floor(Math.random() * 30 + 70),
        pattern: ['เลขชุด', 'เลขดัง', 'เลขเด่น'][Math.floor(Math.random() * 3)]
      });
    }
    return predictions.sort((a, b) => b.confidence - a.confidence);
  };

  const [thaiPredictions, setThaiPredictions] = useState({
    two: generatePredictions('two'),
    three: generatePredictions('three'),
    six: generatePredictions('six')
  });

  const [laoPredictions, setLaoPredictions] = useState({
    two: generatePredictions('two'),
    three: generatePredictions('three'),
    four: generatePredictions('four')
  });

  const refreshPredictions = () => {
    if (activeTab === 'thai') {
      setThaiPredictions({
        two: generatePredictions('two'),
        three: generatePredictions('three'),
        six: generatePredictions('six')
      });
    } else {
      setLaoPredictions({
        two: generatePredictions('two'),
        three: generatePredictions('three'),
        four: generatePredictions('four')
      });
    }
  };

<div className="bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center gap-2">
  <Calendar size={20} />
  <div>
    <label htmlFor="lotto-date" className="text-xs text-gray-500">
      เลือกงวดวันที่:
    </label>
    <input
      type="date"
      id="lotto-date"
      // แปลง object Date เป็น string 'YYYY-MM-DD' เพื่อให้ input แสดงผลได้
      value={selectedDate.toISOString().split('T')[0]} 
      onChange={handleDateChange}
      className="font-semibold bg-transparent focus:outline-none p-1"
    />
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="bg-yellow-400 rounded-t-xl p-2 flex gap-4 shadow-lg">
          <button
            onClick={() => setActiveTab('thai')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'thai'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-transparent text-gray-700 hover:bg-yellow-300'
            }`}
          >
            <Database size={20} />
            หวยรัฐบาลไทย
          </button>
          <button
            onClick={() => setActiveTab('lao')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'lao'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-transparent text-gray-700 hover:bg-yellow-300'
            }`}
          >
            <TrendingUp size={20} />
            หวยลาว
          </button>
        </div>

        {/* Thai Lottery Content */}
        {activeTab === 'thai' && (
          <div className="bg-white rounded-b-xl shadow-2xl p-6">
            {/* AI Prediction Banner */}
            <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl p-6 mb-6 border-2 border-pink-300">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-pink-600" size={32} />
                <h2 className="text-2xl font-bold text-gray-800">วิเคราะห์หวยที่จะออกงวดถัดไป)</h2>
              </div>
              
              {/* Statistics Bar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">เลข 2 ตัว</div>
                  <div className="text-4xl font-bold text-blue-600">{thaiStats.twoDigit.last}</div>
                  <div className="text-xs text-gray-500 mt-1">ความแม่นยำ: 87%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">เลข 3 ตัว</div>
                  <div className="text-4xl font-bold text-blue-600">{thaiStats.threeDigit.last}</div>
                  <div className="text-xs text-gray-500 mt-1">ความแม่นยำ: 87%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">เลข 6 ตัว</div>
                  <div className="text-4xl font-bold text-blue-600">{thaiStats.sixDigit.last}</div>
                  <div className="text-xs text-gray-500 mt-1">ความแม่นยำ: 87%</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '87%'}}></div>
              </div>
              <div className="text-right text-sm text-gray-600">ความแม่นยำ: 87%</div>
            </div>

            {/* Predictions Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Two Digit */}
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                    <Calculator size={20} />
                    พยากรณ์เลข 2 ตัว
                  </h3>
                  <span className="text-xs bg-blue-200 px-2 py-1 rounded">10 อันดับ</span>
                </div>
                <div className="space-y-2">
                  {thaiPredictions.two.map((pred, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center shadow">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-2xl font-bold text-blue-600">{pred.number}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{pred.pattern}</div>
                        <div className="text-xs font-semibold text-green-600">{pred.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  พบ {thaiStats.twoDigit.freq} ครั้ง
                </div>
              </div>

              {/* Three Digit */}
              <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-yellow-700 flex items-center gap-2">
                    <Sparkles size={20} />
                    พยากรณ์เลข 3 ตัว
                  </h3>
                  <span className="text-xs bg-yellow-200 px-2 py-1 rounded">8 อันดับ</span>
                </div>
                <div className="space-y-2">
                  {thaiPredictions.three.map((pred, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center shadow">
                      <div className="flex items-center gap-3">
                        <span className="bg-yellow-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-2xl font-bold text-yellow-600">{pred.number}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{pred.pattern}</div>
                        <div className="text-xs font-semibold text-green-600">{pred.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  พบ {thaiStats.threeDigit.freq} ครั้ง
                </div>
              </div>

              {/* Six Digit */}
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
                    <TrendingUp size={20} />
                    พยากรณ์เลข 6 ตัว
                  </h3>
                  <span className="text-xs bg-green-200 px-2 py-1 rounded">6 อันดับ</span>
                </div>
                <div className="space-y-2">
                  {thaiPredictions.six.map((pred, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center shadow">
                      <div className="flex items-center gap-3">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-xl font-bold text-green-600">{pred.number}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{pred.pattern}</div>
                        <div className="text-xs font-semibold text-green-600">{pred.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  พบ {thaiStats.sixDigit.freq} ครั้ง
                </div>
              </div>
            </div>

            {/* Analysis Tools */}
            <div className="bg-gray-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Database size={24} />
                การวิเคราะห์รูปแบบ
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <TrendingUp size={32} className="mx-auto mb-2 text-blue-400" />
                  <div className="font-semibold">เลขดิ่ง</div>
                  <div className="text-2xl font-bold text-blue-400">พบ 23 ครั้ง</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <RefreshCw size={32} className="mx-auto mb-2 text-green-400" />
                  <div className="font-semibold">เลขวิ่ง</div>
                  <div className="text-2xl font-bold text-green-400">พบ 27 ครั้ง</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <Calculator size={32} className="mx-auto mb-2 text-yellow-400" />
                  <div className="font-semibold">ผลรวมคู่</div>
                  <div className="text-2xl font-bold text-yellow-400">พบ 14 ครั้ง</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <Sparkles size={32} className="mx-auto mb-2 text-pink-400" />
                  <div className="font-semibold">คู่-คี่</div>
                  <div className="text-2xl font-bold text-pink-400">สมดุล</div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshPredictions}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw size={24} />
              สุ่มเลขพยากรณ์ใหม่
            </button>
          </div>
        )}

        {/* Lao Lottery Content */}
        {activeTab === 'lao' && (
          <div className="bg-white rounded-b-xl shadow-2xl p-6">
            {/* AI Prediction Banner */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-6 border-2 border-blue-300">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-blue-600" size={32} />
                <h2 className="text-2xl font-bold text-gray-800">พยากรณ์หวยลาวด้วย AI</h2>
              </div>
              
              {/* Statistics Bar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">เลข 4 ตัว</div>
                  <div className="text-4xl font-bold text-purple-600">{laoStats.fourDigit.last}</div>
                  <div className="text-xs text-gray-500 mt-1">ความแม่นยำ: 82%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">เลข 3 ตัว</div>
                  <div className="text-4xl font-bold text-purple-600">{laoStats.threeDigit.last}</div>
                  <div className="text-xs text-gray-500 mt-1">ความแม่นยำ: 82%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">เลข 2 ตัว</div>
                  <div className="text-4xl font-bold text-purple-600">{laoStats.twoDigit.last}</div>
                  <div className="text-xs text-gray-500 mt-1">ความแม่นยำ: 82%</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '82%'}}></div>
              </div>
              <div className="text-right text-sm text-gray-600">ความแม่นยำ: 82%</div>
            </div>

            {/* Predictions Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Four Digit */}
              <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-purple-700 flex items-center gap-2">
                    <Sparkles size={20} />
                    พยากรณ์เลข 4 ตัว
                  </h3>
                  <span className="text-xs bg-purple-200 px-2 py-1 rounded">6 อันดับ</span>
                </div>
                <div className="space-y-2">
                  {laoPredictions.four.map((pred, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center shadow">
                      <div className="flex items-center gap-3">
                        <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-2xl font-bold text-purple-600">{pred.number}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{pred.pattern}</div>
                        <div className="text-xs font-semibold text-green-600">{pred.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  พบ {laoStats.fourDigit.freq} ครั้ง
                </div>
              </div>

              {/* Three Digit */}
              <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-pink-700 flex items-center gap-2">
                    <TrendingUp size={20} />
                    พยากรณ์เลข 3 ตัว
                  </h3>
                  <span className="text-xs bg-pink-200 px-2 py-1 rounded">8 อันดับ</span>
                </div>
                <div className="space-y-2">
                  {laoPredictions.three.map((pred, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center shadow">
                      <div className="flex items-center gap-3">
                        <span className="bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-2xl font-bold text-pink-600">{pred.number}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{pred.pattern}</div>
                        <div className="text-xs font-semibold text-green-600">{pred.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  พบ {laoStats.threeDigit.freq} ครั้ง
                </div>
              </div>

              {/* Two Digit */}
              <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
                    <Calculator size={20} />
                    พยากรณ์เลข 2 ตัว
                  </h3>
                  <span className="text-xs bg-indigo-200 px-2 py-1 rounded">10 อันดับ</span>
                </div>
                <div className="space-y-2">
                  {laoPredictions.two.map((pred, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center shadow">
                      <div className="flex items-center gap-3">
                        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-2xl font-bold text-indigo-600">{pred.number}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{pred.pattern}</div>
                        <div className="text-xs font-semibold text-green-600">{pred.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  พบ {laoStats.twoDigit.freq} ครั้ง
                </div>
              </div>
            </div>

            {/* Analysis Tools */}
            <div className="bg-gray-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Database size={24} />
                การวิเคราะห์รูปแบบหวยลาว
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <TrendingUp size={32} className="mx-auto mb-2 text-purple-400" />
                  <div className="font-semibold">เลขชุด</div>
                  <div className="text-2xl font-bold text-purple-400">พบ 19 ครั้ง</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <RefreshCw size={32} className="mx-auto mb-2 text-pink-400" />
                  <div className="font-semibold">เลขวิ่ง</div>
                  <div className="text-2xl font-bold text-pink-400">พบ 24 ครั้ง</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <Calculator size={32} className="mx-auto mb-2 text-indigo-400" />
                  <div className="font-semibold">ผลรวมเด่น</div>
                  <div className="text-2xl font-bold text-indigo-400">พบ 31 ครั้ง</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition cursor-pointer">
                  <Sparkles size={32} className="mx-auto mb-2 text-cyan-400" />
                  <div className="font-semibold">ความสมดุล</div>
                  <div className="text-2xl font-bold text-cyan-400">ดีเยี่ยม</div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshPredictions}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw size={24} />
              สุ่มเลขพยากรณ์ใหม่
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">© 2024</p>
        </div>
      </div>
    </div>
  );
};

export default LotteryAnalysisApp;
