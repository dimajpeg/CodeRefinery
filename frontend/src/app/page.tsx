'use client';

import { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface AnalysisResult {
  lintMessages: any[];
  complexity: {
    operands: number;
    operators: number;
    difficulty: number;
    volume: number;
    effort: number;
    cyclomatic: number;
  } | null;
  error?: string;
}

export default function CodeAnalyzer() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert('Пожалуйста, введите код для анализа.');
      return;
    }
    setIsLoading(true);
    setResult(null); // Очищаем предыдущий результат

    try {
      // ВАЖНО: Указываем полный URL нашего бэкенда, который работает на порту 3000
      const { data } = await axios.post('http://localhost:3000/analyze', { code });
      setResult(data);
    } catch (error) {
      console.error('Ошибка при анализе кода:', error);
      alert('Произошла ошибка при обращении к серверу. Убедитесь, что бэкенд запущен.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12 bg-gray-900 text-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">CodeRefinery 💎</h1>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Введіть ваш JavaScript код тут..."
          className="w-full h-64 p-4 font-mono text-sm bg-gray-800 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        <div className="mt-4 text-center">
          <button
            onClick={analyzeCode}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Аналізуємо...' : 'Аналізувати'}
          </button>

          <button
            onClick={() => {
              setCode('');      // Очищаем текстовое поле
              setResult(null); // Убираем результаты анализа
            }}
            className="ml-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700" // Добавляем отступ слева и красный цвет
          >
            Очистити
          </button>
        </div>

        {result && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Результати аналізу</h2>

            {result.complexity && (
              <div>
                <h3 className="text-xl mb-2">Метрики Холстеда та Цикломатична складність</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Object.entries(result.complexity).map(([name, value]) => ({ name, value }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                    <XAxis dataKey="name" stroke="#a0aec0" />
                    <YAxis stroke="#a0aec0" />
                    <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                    <Legend />
                    <Bar dataKey="value" fill="#4299e1" name="Значення" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-xl mb-2">Повідомлення ESLint ({result.lintMessages.length})</h3>
              {result.lintMessages.length > 0 ? (
                <pre className="p-4 bg-gray-900 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(result.lintMessages, null, 2)}
                </pre>
              ) : (
                <p className="text-green-400">Зауважень від ESLint не знайдено. Відмінний код!</p>
              )}
            </div>

            {result.error && (
              <div className="mt-6 p-4 bg-red-900 border border-red-500 rounded-md">
                <h3 className="text-xl text-red-400">Помилка аналізу складності</h3>
                <p>{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}