import { useState } from 'react'
import AppBar from '../../components/AppBar'

const notifications = [
  { id: 1, title: '입금 완료', desc: '국민은행 계좌로 50,000원이 입금되었습니다.', time: '방금 전', read: false },
  { id: 2, title: '출금 완료', desc: '신한은행 계좌에서 30,000원이 출금되었습니다.', time: '10분 전', read: false },
  { id: 3, title: '이벤트 당첨', desc: '축하합니다! 스타벅스 아메리카노 쿠폰에 당첨되었습니다.', time: '1시간 전', read: false },
  { id: 4, title: '보안 알림', desc: '새로운 기기에서 로그인이 감지되었습니다.', time: '3시간 전', read: true },
  { id: 5, title: '카드 결제', desc: 'CU편의점에서 4,500원 결제되었습니다.', time: '어제', read: true },
  { id: 6, title: '자동이체 예정', desc: '내일 월세 500,000원 자동이체가 예정되어 있습니다.', time: '어제', read: true },
]

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--semantic-bg-normal)',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--semantic-line-normal)',
  },
  tab: {
    flex: 1,
    padding: '12px 0',
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-body2-size)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--semantic-label-alternative)',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
  },
  tabActive: {
    color: 'var(--semantic-label-normal)',
    fontWeight: 'var(--font-weight-bold)',
    borderBottomColor: 'var(--semantic-label-normal)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    gap: 12,
    padding: '16px',
    borderBottom: '1px solid var(--semantic-line-alternative)',
    cursor: 'pointer',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'var(--semantic-primary-normal)',
    flexShrink: 0,
    marginTop: 6,
  },
  dotRead: {
    backgroundColor: 'transparent',
  },
  itemContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  itemTitle: {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-body2-size)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--semantic-label-normal)',
    margin: 0,
  },
  itemDesc: {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-label1-size)',
    color: 'var(--semantic-label-alternative)',
    margin: 0,
    lineHeight: '20px',
  },
  itemTime: {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-caption1-size)',
    color: 'var(--semantic-label-assistive)',
    margin: 0,
  },
  empty: {
    padding: '60px 16px',
    textAlign: 'center',
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-body2-size)',
    color: 'var(--semantic-label-assistive)',
  },
}

export default function V3() {
  const [tab, setTab] = useState('all')
  const [items, setItems] = useState(notifications)

  const filtered = tab === 'all' ? items : items.filter(n => !n.read)

  const handleClick = (id) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    alert('알림 상세 화면으로 이동')
  }

  return (
    <div style={styles.page}>
      <AppBar title="알림" onBack={() => alert('뒤로가기')} />

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(tab === 'all' ? styles.tabActive : {}) }}
          onClick={() => setTab('all')}
        >
          전체
        </button>
        <button
          style={{ ...styles.tab, ...(tab === 'unread' ? styles.tabActive : {}) }}
          onClick={() => setTab('unread')}
        >
          안 읽음
        </button>
      </div>

      <div style={styles.list}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>알림이 없습니다</div>
        ) : (
          filtered.map(n => (
            <div key={n.id} style={styles.item} onClick={() => handleClick(n.id)}>
              <div style={{ ...styles.dot, ...(n.read ? styles.dotRead : {}) }} />
              <div style={styles.itemContent}>
                <p style={styles.itemTitle}>{n.title}</p>
                <p style={styles.itemDesc}>{n.desc}</p>
                <p style={styles.itemTime}>{n.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
