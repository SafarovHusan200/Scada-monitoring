'use client';
import { useState } from 'react';
import { FaArrowRight, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const statusStyle = {
  normal: {
    bg: 'rgba(0,126,55,0.10)',
    color: '#006229',
    border: 'rgba(0,98,41,0.20)',
    dot: '#006229',
  },
  warning: { bg: '#FFEDD5', color: '#C2410C', border: '#FED7AA', dot: '#F97316' },
  critical: { bg: '#FEE2E2', color: '#BA1A1A', border: '#FECACA', dot: '#BA1A1A' },
  offline: { bg: '#F3F4F6', color: '#374151', border: '#D1D5DB', dot: '#6B7280' },
};

const paramTextColor = {
  normal: '#191C1E',
  warning: '#F97316',
  critical: '#BA1A1A',
  offline: '#374151',
};

const STATUS_ORDER = { normal: 0, warning: 1, critical: 2, offline: 3 };

const SORTABLE_COLS = ['pressure', 'flow', 'temperature', 'status'];

export default function TableComponent({ data, isLoading }) {
  const [sort, setSort] = useState({ key: null, dir: null }); // dir: 'asc' | 'desc' | null

  const handleSort = (key) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      if (prev.dir === 'desc') return { key: null, dir: null }; // reset
      return { key, dir: 'asc' };
    });
  };

  const getSorted = (rows) => {
    if (!sort.key || !sort.dir) return rows;
    return [...rows].sort((a, b) => {
      let av, bv;
      if (sort.key === 'status') {
        av = STATUS_ORDER[a.status] ?? 99;
        bv = STATUS_ORDER[b.status] ?? 99;
      } else {
        av = a.parameters[sort.key];
        bv = b.parameters[sort.key];
      }
      return sort.dir === 'asc' ? av - bv : bv - av;
    });
  };

  if (isLoading) {
    return (
      <div style={{ width: '100%' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 52,
              marginBottom: 8,
              borderRadius: 8,
              background: '#F3F4F6',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        ))}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      </div>
    );
  }

  if (!data || data?.length === 0) {
    return (
      <h2 style={{ color: '#6B7280', textAlign: 'center', padding: '2rem 0' }}>
        Ma'lumot topilmadi
      </h2>
    );
  }

  const messageData = (item) =>
    item.message ? item.message.split(' ').slice(2).join(' ') : 'Hammasi joyida';

  const sortedData = getSorted(data);

  const thBase = {
    padding: '10px 16px',
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#6B7280',
    borderBottom: '1px solid #E5E7EB',
    whiteSpace: 'nowrap',
    background: '#FAFAFA',
  };

  const tdStyle = {
    padding: '12px 16px',
    fontSize: 14,
    color: '#191C1E',
    borderBottom: '1px solid #F3F4F6',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  };

  // Sort tugmasi
  const SortBtn = ({ colKey }) => {
    const isActive = sort.key === colKey;
    const isAsc = isActive && sort.dir === 'asc';
    const isDesc = isActive && sort.dir === 'desc';

    return (
      <span
        onClick={() => handleSort(colKey)}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: 6,
          gap: 1,
          cursor: 'pointer',
          verticalAlign: 'middle',
        }}
      >
        <FaArrowUp size={8} style={{ color: isAsc ? '#004AC6' : '#C9CDD8' }} />
        <FaArrowDown size={8} style={{ color: isDesc ? '#004AC6' : '#C9CDD8' }} />
      </span>
    );
  };

  // Sarlavha yordamchi
  const Th = ({ children, colKey, center }) => (
    <th
      style={{
        ...thBase,
        textAlign: center ? 'center' : 'left',
        cursor: SORTABLE_COLS.includes(colKey) ? 'pointer' : 'default',
      }}
      onClick={() => SORTABLE_COLS.includes(colKey) && handleSort(colKey)}
    >
      {children}
      {SORTABLE_COLS.includes(colKey) && <SortBtn colKey={colKey} />}
    </th>
  );

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        borderRadius: 16,
        border: '1px solid #E5E7EB',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
        <thead>
          <tr>
            <th style={thBase}>#</th>
            <th style={thBase}>Nomi</th>
            <th style={thBase}>Tur</th>
            <th style={thBase}>Hudud</th>
            <th style={thBase}>Operator</th>
            <Th colKey="pressure" center>
              Bosim (bar)
            </Th>
            <Th colKey="flow" center>
              Oqim (m³/s)
            </Th>
            <Th colKey="temperature" center>
              Harorat (°C)
            </Th>
            <Th colKey="status" center>
              Status
            </Th>
            <th style={{ ...thBase, textAlign: 'center' }}>Xabar</th>
            <th style={thBase}></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => {
            const s = statusStyle[item.status] || statusStyle.normal;
            const pColor = paramTextColor[item.status] || '#191C1E';
            return (
              <tr
                key={index}
                style={{ transition: 'background 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F9FAFB')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ ...tdStyle, color: '#9CA3AF', fontSize: 12 }}>{index + 1}</td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item.name}</td>
                <td style={{ ...tdStyle, color: '#6B7280' }}>{item.type}</td>
                <td style={{ ...tdStyle, color: '#6B7280' }}>{item.location?.region}</td>
                <td style={{ ...tdStyle, color: '#6B7280' }}>{item.operator}</td>
                <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 700, color: pColor }}>
                  {item.parameters.pressure}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600 }}>
                  {Math.round(item.parameters.flow)}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600 }}>
                  {Math.round(item.parameters.temperature)}°
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      background: s.bg,
                      color: s.color,
                      border: `1px solid ${s.border}`,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: s.dot,
                        flexShrink: 0,
                      }}
                    />
                    {item.status}
                  </span>
                </td>
                <td
                  style={{
                    ...tdStyle,
                    color: '#6B7280',
                    fontSize: 12,
                    maxWidth: 180,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {messageData(item)}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      border: `1px solid ${s.border}`,
                      background: item.status === 'critical' ? '#BA1A1A' : 'transparent',
                      color: item.status === 'critical' ? '#fff' : s.color,
                      cursor: 'pointer',
                    }}
                  >
                    <FaArrowRight size={11} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
