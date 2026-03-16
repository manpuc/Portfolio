// src/components/Greeting.jsx
import React, { useState } from 'react';

export default function Greeting() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: '20px', border: '2px solid #000', margin: '20px' }}>
            <h2>Reactコンポーネントのテスト</h2>
            <p>ボタンを押した回数: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                クリック！
            </button>
        </div>
    );
}
