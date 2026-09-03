import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateLot.css';
import AppHeader from '../../components/AppHeader.jsx';

const CATEGORIES = { industrial: 'Industrial Machinery', vehicles: 'Vehicles & Fleet', construction: 'Construction Equipment', electronics: 'Electronics & IT Assets', furniture: 'Furniture & Fixtures', scrap: 'Scrap & Salvage' };
const FORMATS = [
  { id: 'buynow', label: 'Buy-Now', desc: 'Traders make offers; you choose who to sell to.' },
  { id: 'easy', label: 'Easy Auction', desc: 'Scheduled, with a real inspection window.' },
  { id: 'express', label: 'Express Auction', desc: 'Fast — starts once 3 Traders pledge, closes within the hour.' },
  { id: 'tender', label: 'Tender Auction', desc: 'Fully private, invite-only — you control participation.' },
];

export default function CreateLot() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [newLotId, setNewLotId] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [step1Error, setStep1Error] = useState('');
  const [extraBatches, setExtraBatches] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [formatId, setFormatId] = useState(null);
  const [reserveValue, setReserveValue] = useState('');
  const [expectedValue, setExpectedValue] = useState('');
  const [inspectionWindow, setInspectionWindow] = useState('3d');
  const [step3Error, setStep3Error] = useState('');
  const [preCheckStatus, setPreCheckStatus] = useState('idle');

  const goToStep2 = () => {
    if (!category || !condition || !title.trim()) { setStep1Error('Fill in category, condition, and title before continuing.'); return; }
    setStep(2);
  };
  const runPreCheck = () => {
    if (!formatId) { setStep3Error('Choose a sale format.'); return; }
    if (!reserveValue) { setStep3Error('Enter a Reserve Value.'); return; }
    setStep(4); setPreCheckStatus('running');
    setTimeout(() => setPreCheckStatus('done'), 1200);
  };
  const submitLot = () => { setNewLotId('LOT-' + Math.floor(10000 + Math.random() * 89999)); setSubmitted(true); };
  const selectedFormat = FORMATS.find((f) => f.id === formatId);

  return (
    <div className="cl-page">
      <AppHeader variant="light" contextNav={[{ label: "Create a Lot", to: "/create-lot", active: true }, { label: "Defect Disclosure", to: "/defect-disclosure" }]} />
      <main className="cl-main">
        <div className="legal-eyebrow">Market Maker</div>
        <h1 className="cl-title">Create Lot</h1>
        <p className="cl-sub">List an asset for sale. Every Lot goes through an AI Pre-Check before routing to your TSX Master for approval.</p>

        <div className="cl-steps">{[1,2,3,4,5].map((n) => <div key={n} className="cl-step-bar" style={{ background: n <= step ? 'var(--color-accent)' : 'var(--color-border)' }} />)}</div>

        {submitted ? (
          <div className="cl-submitted">
            <div className="cl-submitted__check">✓</div>
            <p className="cl-submitted__title">Lot {newLotId} submitted for review</p>
            <p className="cl-submitted__text">Routed to your TSX Master. You'll be notified once it's approved and live, or if changes are requested.</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <>
                <h2 className="cl-h2">1. What are you listing?</h2>
                <div className="cl-grid2">
                  <div>
                    <label className="cl-label">Category</label>
                    <select className="cl-select" value={category} onChange={(e) => { setCategory(e.target.value); setStep1Error(''); }}>
                      <option value="">Select category</option>
                      {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="cl-label">Condition</label>
                    <select className="cl-select" value={condition} onChange={(e) => { setCondition(e.target.value); setStep1Error(''); }}>
                      <option value="">Select condition</option>
                      <option value="working_minimal">Working, Minimal Wear</option><option value="working_moderate">Working, Moderate Wear</option>
                      <option value="needs_repair">Needs Repair</option><option value="non_functional">Non-Functional / For Parts</option>
                    </select>
                  </div>
                </div>
                <label className="cl-label">Title</label>
                <input className="cl-input" placeholder="e.g. CNC Lathe Machine, 2018, Surplus" value={title} onChange={(e) => { setTitle(e.target.value); setStep1Error(''); }} />
                <label className="cl-label">Description — include any known defects (see <Link to="/defect-disclosure">Defect Disclosure</Link> requirements)</label>
                <textarea className="cl-textarea" placeholder="Describe the item accurately, including condition, age, and any known flaws." rows={4} value={description} onChange={(e) => { setDescription(e.target.value); setStep1Error(''); }} />
                {step1Error && <p className="cl-error">{step1Error}</p>}
                <button className="cl-btn-primary" onClick={goToStep2}>Continue</button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="cl-h2">2. Upload media</h2>
                <p className="cl-hint">At least 5 real photos of the actual item, captured through the app — no stock images. Location/timestamp is captured automatically.</p>
                <div className="cl-row-between">
                  <p className="cl-strong">Photos ({5 + extraBatches * 5}/50)</p>
                  <button className="cl-outline-btn" onClick={() => { if (extraBatches * 5 < 45) setExtraBatches(extraBatches + 1); }}>⇪ Bulk Upload</button>
                </div>
                <div className="cl-media">
                  {Array.from({ length: 5 + extraBatches * 5 }, (_, i) => (
                    <div key={i} className="cl-photo-slot">Photo {i + 1}</div>
                  ))}
                </div>
                <p className="cl-hint">Up to 50 photos total. Bulk Upload adds 5 more slots at a time.</p>

                <p className="cl-strong">Video (optional, up to 2 minutes)</p>
                <div className="cl-video-slot">Video walkthrough</div>

                <p className="cl-strong">Supporting documents (optional — invoice, registration, inspection report)</p>
                <div className="cl-doc-list">
                  {documents.map((d, i) => (
                    <div key={i} className="cl-doc-row"><span>{d}</span><button onClick={() => setDocuments(documents.filter((_, idx) => idx !== i))}>Remove</button></div>
                  ))}
                  <button className="cl-add-doc" onClick={() => setDocuments([...documents, `Document ${documents.length + 1}.pdf`])}>+ Add Document</button>
                </div>

                <div className="cl-nav-row">
                  <button className="cl-link-btn" onClick={() => setStep(1)}>← Back</button>
                  <button className="cl-btn-primary cl-btn-primary--right" onClick={() => setStep(3)}>Continue</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="cl-h2">3. Choose a sale format</h2>
                <div className="cl-format-grid">
                  {FORMATS.map((f) => (
                    <button key={f.id} onClick={() => { setFormatId(f.id); setStep3Error(''); }} className="cl-format-opt" style={{ borderColor: formatId === f.id ? 'var(--color-accent)' : 'var(--color-border)' }}>
                      <p className="cl-format-opt__title">{f.label}</p><p className="cl-format-opt__desc">{f.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="cl-grid2">
                  <div>
                    <label className="cl-label">Reserve Value (RV) — confidential floor price</label>
                    <input className="cl-input" placeholder="₹" value={reserveValue} onChange={(e) => { setReserveValue(e.target.value); setStep3Error(''); }} />
                  </div>
                  {formatId === 'buynow' && (
                    <div><label className="cl-label">Expected Value (EV) — target/asking price</label><input className="cl-input" placeholder="₹" value={expectedValue} onChange={(e) => setExpectedValue(e.target.value)} /></div>
                  )}
                  {formatId === 'easy' && (
                    <div>
                      <label className="cl-label">Inspection window</label>
                      <select className="cl-select" value={inspectionWindow} onChange={(e) => setInspectionWindow(e.target.value)}>
                        <option value="24h">24 hours</option><option value="48h">48 hours</option><option value="3d">3 days</option><option value="7d">7 days</option>
                      </select>
                    </div>
                  )}
                </div>
                {step3Error && <p className="cl-error cl-error--top">{step3Error}</p>}
                <div className="cl-nav-row">
                  <button className="cl-link-btn" onClick={() => setStep(2)}>← Back</button>
                  <button className="cl-btn-primary cl-btn-primary--right" onClick={runPreCheck}>Run AI Pre-Check</button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="cl-h2">4. AI Pre-Check</h2>
                <p className="cl-hint">An advisory scan of your listing content — not a substitute for your TSX Master's review.</p>
                {preCheckStatus === 'running' && <div className="cl-scanning">Scanning listing content…</div>}
                {preCheckStatus === 'done' && (
                  <>
                    <div className="cl-precheck-card">
                      <div className="cl-row-between"><p className="cl-strong">Listing Quality Score</p><p className="cl-score">84/100</p></div>
                      <div className="cl-flags">
                        <div><span style={{ color: 'var(--color-success)' }}>✓</span><span>5 photos meet the minimum requirement, captured in-app with location/timestamp data.</span></div>
                        <div><span style={{ color: 'var(--color-success)' }}>✓</span><span>Description length and detail are adequate for this category.</span></div>
                        <div><span style={{ color: 'var(--color-warning)' }}>!</span><span>Consider adding a close-up photo of any visible wear — improves Trader confidence.</span></div>
                      </div>
                    </div>
                    <div className="cl-nav-row">
                      <button className="cl-link-btn" onClick={() => setStep(3)}>← Back</button>
                      <button className="cl-btn-primary cl-btn-primary--right" onClick={() => setStep(5)}>Continue to Review</button>
                    </div>
                  </>
                )}
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="cl-h2">5. Review &amp; submit</h2>
                <div className="cl-review-card">
                  <div className="cl-review-row"><span>Title</span><span>{title}</span></div>
                  <div className="cl-review-row"><span>Category</span><span>{CATEGORIES[category] || ''}</span></div>
                  <div className="cl-review-row"><span>Format</span><span>{selectedFormat ? selectedFormat.label : ''}</span></div>
                  <div className="cl-review-row"><span>Reserve Value</span><span>₹{reserveValue}</span></div>
                  <div className="cl-review-row"><span>AI Pre-Check Score</span><span style={{ color: 'var(--color-success)' }}>84/100</span></div>
                </div>
                <div className="cl-notice">Submitting routes this Lot to your TSX Master for approval. It won't go live until approved.</div>
                <div className="cl-nav-row">
                  <button className="cl-link-btn" onClick={() => setStep(4)}>← Back</button>
                  <button className="cl-btn-gold cl-btn-primary--right" onClick={submitLot}>Submit for Approval</button>
                </div>
              </>
            )}
          </>
        )}
      </main>
      <footer className="cl-footer"><p>See our <Link to="/dos-and-donts">Dos &amp; Don'ts</Link> for listing best practices.</p></footer>
    </div>
  );
}
