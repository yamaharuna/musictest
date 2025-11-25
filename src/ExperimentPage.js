import React, { useState, useEffect } from 'react';
import './App.css';

const playlistId = '3QfpDqruk3bn4QbHjvscsM';

// シナリオ定義
const scenarios = {
  1: {
    id: 1,
    label: 'シナリオ①',
    script: `シナリオ①\nA：「ねえ、最近みんな何にハマってる？」\nB：「私はパン作り！家じゅういい匂いになるんだよ〜」\nC：「えっ、いいな！バターの香りとか最高じゃん」\nA：「Bんち行きたい！焼きたてのパンとか絶対おいしい」\nB：「ほんと？この前クロワッサン作ったら、部屋中バターの匂いしてた（笑）」\nC：「お腹空いてきた！パン食べたくなってきた」\nA：「でもそういう時間って癒やされるよね。なんか贅沢〜」\nC：「最近そういう“ゆったりした時間”大事かもね」\nA：「わかる！！」\nB：「あとさ、私最近ゲームもやってるんだ。パズル系」\nC：「Bってほんと器用だね。」\nC：「パズルゲーム私もよくやるよ。面白いよね。」\nA：「それ聞いたら俺もやってみたくなる！あ、でも前やったらめっちゃ下手だった。（笑）」\nB：「大丈夫、大丈夫。慣れれば楽しめるよ」\nC：「そうそう。今度みんなでやってみよー！」`,
    songNumbers: [1,2,3,4,5],
    songs: {
      1: { title: 'うちで踊ろう', artist: '星野源' },
      2: { title: 'パンと蜜をめしあがれ', artist: 'クラムボン' },
      3: { title: 'Better Together', artist: 'Jack Johnson' },
      4: { title: '世界の秘密', artist: 'Vaundy' },
      5: { title: 'napori', artist: 'Vaundy' },
    }
  },
  2: {
    id: 2,
    label: 'シナリオ②',
    script: `シナリオ②\nA：「次の旅行、まだ全然決まらないね…」\nB：「うん、候補はいくつかあるけど、どれにするか迷う」\nC：「日程も微妙だし、場所もまだ決められないし…」\nA：「温泉とか海とか…うーん、どっちも魅力的で決められない」\nB：「でも、移動時間とか考えると悩むね」\nC：「予算もあるし…どこが一番いいか分からない」\nA：「みんな意見バラバラだし、なかなかまとまらないね…」\nB：「うーん…こういうときどうしたらいいんだろう」\nC：「迷うけど、絶対楽しい場所にしたいな…」\nA：「うーん、考えれば考えるほど決まらない感じ」\nB：「ほんと、話してても堂々巡りだね…」\nC：「でも、旅行ってそういう迷いも含めて楽しいんだろうね…」\nA：「決まらないけど、行ったら楽しいかもね！」\nB：「うん、確かに誰と行くかの方が大事だしね。」\nC：「もう少し考えてみよう」\nA：「うん、私も色々調べてみるね」\nB：「そうしようか」`,
    songNumbers: [6,7,8,9,10],
    songs: {
      6: { title: 'リライト', artist: 'ASIAN KUNG-FU GENERATION' },
      7: { title: 'Week End', artist: '星野源' },
      8: { title: 'SUN', artist: '星野源' },
      9: { title: '新宝島', artist: 'サカナクション' },
      10:{ title: 'RPG', artist: 'SEKAI NO OWARI' },
    }
  },
  3: {
    id: 3,
    label: 'シナリオ③',
    script: `シナリオ③\nA：「え、これ全部私のため…？すごい！」\nB：「そうだよ！みんなで準備したんだから」\nC：「見て、このケーキ！めっちゃかわいいでしょ！」\nA：「わああ、すごい…感動して泣きそう」\nB：「ほら、ちゃんと写真も撮ろう！」\nA：「もう…みんなありがとう。うれしい」\nC：「サプライズ喜んでもらえてよかった〜」\nA：「この飾りも全部私の好きな色だし、なんでわかったの？」\nB：「内緒でリサーチしたのさ（笑）」\nC：「Aのリアクション最高だね」\nA：「全然準備してるの気づかなかったよー（笑）」\nB：「よかった〜、成功して！」\nB：「サプライズする側も緊張したよね。」\nC：「サプライズって、やっぱりやる側も楽しいね」`,
    songNumbers: [11,12,13,14,15],
    songs: {
      11: { title: 'HAPPY HAPPY BIRTHDAY', artist: 'DREAMS COME TRUE' },
      12: { title: '115万キロのフィルム', artist: 'Official髭男dism' },
      13: { title: 'Happy', artist: 'Pharrell Williams' },
      14: { title: 'RPG', artist: 'SEKAI NO OWARI' },
      15: { title: 'Happiness', artist: '嵐' },
    }
  }
};

const initialScores = { song1: null, song2: null, song3: null, song4: null, song5: null };
const experimentOverview = `実験概要\nこの実験では、大学生のホームパーティでの会話を想定したスクリプトを使い、どのような楽曲が流れると参加者の満足度が高くなるかを検証します。参加者の皆さんには、曲と会話のマッチングについて評価していただきます。\n\n実験の流れ\n会話のシナリオ①~③について、状況をイメージしていただきながら、そのシーンに対して選ばれた 5 曲を順に再生します（Spotify プレイリストを使用）。\n各曲について評価します。\n\nスコア：1〜5段階でそれぞれの曲が「会話の質をどの程度高め、参加者として満足できるか」について選択してください。\n理由：なぜそのスコアにしたのか、特に とても合っている と感じた曲、または 全く合っていない と感じた曲について、各曲に割り振られている番号と一緒に簡単に理由を記入してください。最後にシナリオ①〜③全ての評価が終わったら右下のcsvダウンロードボタンを押してデータを保存してください。`;

export default function ExperimentPage() {
  const [currentScenarioId, setCurrentScenarioId] = useState(1);
  const scenario = scenarios[currentScenarioId];
  const makeInitialScores = (sc) => sc.songNumbers.reduce((acc, num) => { acc[`song${num}`] = null; return acc; }, {});
  const [scores, setScores] = useState(makeInitialScores(scenario));
  const [comment, setComment] = useState('');
  // すべての提出データ（セッション内）
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('experiment_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  // ドラフト（未完了の入力）をシナリオ別に保持
  const [drafts, setDrafts] = useState(() => {
    try {
      const saved = localStorage.getItem('experiment_drafts');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const persistSubmissions = (list) => {
    try { localStorage.setItem('experiment_submissions', JSON.stringify(list)); } catch {}
  };
  const persistDrafts = (obj) => {
    try { localStorage.setItem('experiment_drafts', JSON.stringify(obj)); } catch {}
  };

  const upsertSubmission = (payload) => {
    // 同一シナリオの既存提出を置き換え（最新のみ保持）
    const filtered = submissions.filter(s => s.scenario !== payload.scenario);
    const next = [...filtered, payload];
    setSubmissions(next);
    persistSubmissions(next);
  };

  // 初期表示時に当該シナリオのドラフト or 提出済みを復元
  useEffect(() => {
    const d = drafts[currentScenarioId];
    if (d) {
      setScores(d.scores || makeInitialScores(scenario));
      setComment(d.comment || '');
    } else {
      const submitted = [...submissions].reverse().find(s => s.scenario === currentScenarioId);
      if (submitted) {
        setScores(submitted.scores || makeInitialScores(scenario));
        setComment(submitted.comment || '');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isScenarioComplete = (scId, s) => {
    const nums = scenarios[scId].songNumbers;
    return nums.every(n => typeof s[`song${n}`] === 'number' && s[`song${n}`] >= 1 && s[`song${n}`] <= 5);
  };

  const commitCurrentScenarioIfComplete = () => {
    if (isScenarioComplete(currentScenarioId, scores)) {
      const payload = { scenario: currentScenarioId, scores, comment, playlistId, timestamp: new Date().toISOString() };
      upsertSubmission(payload);
      // 完了後もドラフトは残しておく（戻ってきたときに選択を復元）
      const nextDrafts = { ...drafts, [currentScenarioId]: { scores, comment } };
      setDrafts(nextDrafts);
      persistDrafts(nextDrafts);
    } else {
      // 未完了ならドラフト保存のみ（提出に含めない）
      const nextDrafts = { ...drafts, [currentScenarioId]: { scores, comment } };
      setDrafts(nextDrafts);
      persistDrafts(nextDrafts);
    }
  };

  const handleScenarioChange = (id) => {
    // 現在の入力を保存（完了なら提出、ドラフトも保持）
    commitCurrentScenarioIfComplete();
    // 切り替え
    setCurrentScenarioId(id);
    const targetDraft = drafts[id];
    if (targetDraft) {
      setScores(targetDraft.scores || makeInitialScores(scenarios[id]));
      setComment(targetDraft.comment || '');
    } else {
      const submitted = [...submissions].reverse().find(s => s.scenario === id);
      if (submitted) {
        setScores(submitted.scores || makeInitialScores(scenarios[id]));
        setComment(submitted.comment || '');
      } else {
        setScores(makeInitialScores(scenarios[id]));
        setComment('');
      }
    }
  };

  const handleScoreChange = (songKey, value) => {
    const nextScores = { ...scores, [songKey]: Number(value) };
    setScores(nextScores);
    // 入力のたびにドラフト更新
    const nextDrafts = { ...drafts, [currentScenarioId]: { scores: nextScores, comment } };
    setDrafts(nextDrafts);
    persistDrafts(nextDrafts);
  };

  const handleCommentChange = (value) => {
    setComment(value);
    const nextDrafts = { ...drafts, [currentScenarioId]: { scores, comment: value } };
    setDrafts(nextDrafts);
    persistDrafts(nextDrafts);
  };

  // スコア説明マップ
  const scoreDescriptions = {
    1: '全く合っていない',
    2: 'あまり合っていない',
    3: 'どちらともいえない',
    4: 'まあまあ合っている',
    5: 'とても合っている'
  };

  const downloadCSV = () => {
    // 現在の入力を保存してから出力（完了のみ提出）
    commitCurrentScenarioIfComplete();
    const headers = ['scenarioId','songNumber','score','comment','timestamp'];
    const rows = [];
    const latestByScenario = {};
    submissions.forEach(s => { latestByScenario[s.scenario] = s; });
    Object.values(latestByScenario).forEach(s => {
      const songNums = scenarios[s.scenario].songNumbers;
      songNums.forEach(num => {
        const score = s.scores[`song${num}`] ?? '';
        rows.push([s.scenario, num, score, s.comment.replace(/\n/g,' '), s.timestamp]);
      });
    });
    const csvBody = [headers.join(','), ...rows.map(r => r.map(v => {
      const str = String(v ?? '');
      const needsQuote = /[",\n]/.test(str) || str.includes(',');
      const escaped = str.replace(/"/g,'""');
      return needsQuote ? `"${escaped}"` : escaped;
    }).join(','))].join('\n');

    // 文字化け対策: UTF-8 BOM を先頭に付与（Excel 等での日本語対応）
    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvBody;

    const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const ts = new Date().toISOString().replace(/[:.]/g,'-');
    a.download = `ratings_${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>会話内容に基づく楽曲推薦 実験</h1>
      <section className="overview">
        <pre className="overview-box">{experimentOverview}</pre>
      </section>
      <div className="playlist" style={{ marginTop: '16px' }}>
        <h2>再生案内</h2>
        <p>プレイリストを開いて対象シナリオの曲番号順に再生してください。</p>
        <a href={`https://open.spotify.com/playlist/${playlistId}`} target="_blank" rel="noopener noreferrer" className="open-playlist-btn">Spotifyでプレイリストを開く</a>
        <p className="notice">全シナリオ評価後にCSVをダウンロードしてください。</p>
      </div>

      {/* タブナビゲーション */}
      <div className="tabs">
        {Object.values(scenarios).map(sc => (
          <button
            key={sc.id}
            className={sc.id === currentScenarioId ? 'tab-btn active' : 'tab-btn'}
            onClick={() => handleScenarioChange(sc.id)}
          >{sc.label}</button>
        ))}
        <button onClick={downloadCSV} className="tab-btn" style={{ marginLeft:'auto', background:'#4b8bf4', color:'#fff' }}>CSVダウンロード</button>
      </div>

      {/* タブパネル */}
      <div className="tab-panel">
        <h2>{scenario.label}</h2>
        <p style={{fontSize:'0.85rem', color:'#54677b', margin:'0 0 8px'}}>曲番号: {scenario.songNumbers.join(', ')} / スコアは1〜5</p>
        <pre className="script-box">{scenario.script}</pre>

        <div className="rating-form" style={{ boxShadow:'none', border:'none', padding:'0', marginTop:'24px' }}>
          <h2 style={{ borderLeft:'none', paddingLeft:0 }}>評価フォーム</h2>
          {scenario.songNumbers.map((num) => {
            return (
              <div key={num} className="song-block">
                <fieldset>
                  <legend>{num} 曲目「{scenario.songs[num].title}{scenario.songs[num].artist ? ` / ${scenario.songs[num].artist}` : ''}」</legend>
                  <div className="radio-row" style={{ display:'flex', gap:'4px', marginTop:'4px' }}>
                    {[1,2,3,4,5].map(score => (
                      <div key={score} className="score-cell" style={{ flex:1, textAlign:'center' }}>
                        <div className="score-desc" style={{ fontSize:'0.65rem', lineHeight:'1.1', color:'#4b5d70', marginBottom:'4px', minHeight:'2.2em' }}>{score}: {scoreDescriptions[score]}</div>
                        <label className="radio-label" style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', fontWeight:'600' }}>
                          <input
                            type="radio"
                            name={`song${num}`}
                            value={score}
                            checked={scores[`song${num}`] === score}
                            onChange={(e) => handleScoreChange(`song${num}`, e.target.value)}
                            required
                          />
                          <span style={{ marginTop:'2px' }}>{score}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            );
          })}
          {/* コメント入力 */}
          <div className="comment-block" style={{ marginTop:'20px' }}>
            <label>
              自由記述（理由 / 特に合う・合わない曲番号など）
              <textarea
                value={comment}
                onChange={(e) => handleCommentChange(e.target.value)}
                placeholder="例: 1曲目は落ち着いた雰囲気が会話と一致していた。5曲目はテンポが速く少し浮いていた。"
                rows={5}
                required
              />
            </label>
          </div>
          <p className="tab-footer-note">このシナリオの全曲にスコアを付けると自動保存されます。切替えても入力は保持されます。</p>
        </div>
      </div>
    </div>
  );
}
