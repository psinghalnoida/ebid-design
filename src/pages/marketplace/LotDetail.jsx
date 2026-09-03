import { Link, useSearchParams } from 'react-router-dom';
import './LotDetail.css';
import AppHeader from '../../components/AppHeader.jsx';

const LOTS = [
  { id: 'LOT-48210', title: 'Repossessed Excavator, CAT 320D', category: 'Heavy Equipment', tsx: 'Ironclad Metals TSX', format: 'TENDER', condition: 'Used — Good', description: 'Mid-life CAT 320D excavator repossessed from a construction fleet. Runs and operates; undercarriage shows expected wear for hours logged. Sold as-is, inspection window available before close.', mmName: 'Northline Salvage Co.', mmRating: '3.8', mmInitials: 'NS', priceLabel: 'Reserve Value', priceValue: '₹18,40,000', timeLeft: '2 days 4 hours left', matches: true, catMatch: 'Yes', locMatch: 'Yes', valMatch: 'Yes' },
  { id: 'LOT-49012', title: 'Industrial Compressor Unit', category: 'Industrial Machinery', tsx: 'Ironclad Metals TSX', format: 'EASY', condition: 'Used — Fair', description: 'Screw-type industrial air compressor, decommissioned from a textile plant. Functional at time of listing; buyer to arrange collection and transport.', mmName: 'Northline Salvage Co.', mmRating: '3.8', mmInitials: 'NS', priceLabel: 'Current Highest Bid', priceValue: '₹3,20,000', timeLeft: '6 hours left', matches: true, catMatch: 'Yes', locMatch: 'Yes', valMatch: 'Yes' },
  { id: 'LOT-49510', title: 'Fleet of 6 Delivery Vans (2019)', category: 'Vehicles', tsx: 'AutoYard TSX', format: 'BUY-NOW', condition: 'Used — Good', description: 'Fleet of 6 diesel delivery vans, 2019 model year, fleet-maintained with service records. Sold together as one Lot.', mmName: 'Ravindra Auto Traders', mmRating: '4.6', mmInitials: 'RA', priceLabel: 'Fixed Price', priceValue: '₹9,90,000', timeLeft: 'Open-ended — Buy-Now', matches: false, catMatch: 'No', locMatch: 'Yes', valMatch: 'No' },
  { id: 'LOT-50120', title: 'Cotton Yarn Surplus, 40 Bales', category: 'Textiles', tsx: 'Heritage Textiles TSX', format: 'EXPRESS', condition: 'New — Surplus', description: 'Surplus cotton yarn stock, 40 bales, from a cancelled export order. Quality certificates available on request.', mmName: 'Heritage Textiles Ltd.', mmRating: '4.2', mmInitials: 'HT', priceLabel: 'Sealed Bid — Hidden Until Close', priceValue: '—', timeLeft: '18 hours left', matches: true, catMatch: 'Yes', locMatch: 'No', valMatch: 'Yes' },
];
const FORMAT_META = {
  EASY: { ctaLabel: 'Place Bid', isEasy: true },
  EXPRESS: { ctaLabel: 'Submit Sealed Bid', isExpress: true },
  TENDER: { ctaLabel: 'Submit Tender Offer', isTender: true },
  'BUY-NOW': { ctaLabel: 'Buy Now', isBuyNow: true },
};
const matchColor = (v) => (v === 'Yes' ? 'var(--color-success)' : 'var(--color-text-faint)');

export default function LotDetail() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const lot = LOTS.find((l) => l.id === id) || LOTS[0];
  const meta = FORMAT_META[lot.format] || FORMAT_META.EASY;
  const related = LOTS.filter((l) => l.id !== lot.id).slice(0, 3);

  return (
    <div className="ldp-page">
      <AppHeader variant="light" contextNav={[{ label: "Marketplace", to: "/marketplace" }, { label: "Lot Detail", to: "/lot-detail", active: true }]} />

      <main className="ldp-main">
        <div className="ldp-crumb">{lot.category} · {lot.tsx} · <span className="ldp-mono">{lot.id}</span></div>

        <div className="ldp-layout">
          <div>
            <div className="ldp-hero-photo" />
            <div className="ldp-thumbs">{[1,2,3,4,5].map((t) => <div key={t} className="ldp-thumb" />)}</div>

            <h1 className="ldp-title">{lot.title}</h1>
            <div className="ldp-tags">
              <span className="ldp-tag">{lot.condition}</span>
              {lot.matches && <span className="ldp-tag ldp-tag--match">✓ Matches your preferences</span>}
            </div>

            <h2 className="ldp-h2">Description</h2>
            <p className="ldp-desc">{lot.description}</p>

            <h2 className="ldp-h2">Market Maker</h2>
            <div className="ldp-mm">
              <div className="ldp-mm__avatar">{lot.mmInitials}</div>
              <div><div className="ldp-mm__name">{lot.mmName}</div><div className="ldp-mm__meta">MM★ {lot.mmRating} · Selling on {lot.tsx}</div></div>
            </div>

            {related.length > 0 && (
              <>
                <h2 className="ldp-h2">Related Lots</h2>
                <div className="ldp-rel-grid">
                  {related.map((r) => (
                    <Link key={r.id} to={`/lot-detail?id=${r.id}`} className="ldp-rel">
                      <div className="ldp-rel__photo" />
                      <div className="ldp-rel__body"><div className="ldp-rel__title">{r.title}</div><div className="ldp-rel__price">{r.priceValue === '—' ? 'Sealed bid' : r.priceValue}</div></div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="ldp-bid-box">
            <span className="ldp-format-badge">{lot.format}</span>
            <div className="ldp-price-label">{lot.priceLabel}</div>
            <div className="ldp-price-value">{lot.priceValue}</div>
            <div className="ldp-timeleft">{lot.timeLeft}</div>

            {meta.isEasy && (<><input className="ldp-bid-input" placeholder="Enter your bid (₹)" /><p className="ldp-bid-note">Open ascending bid — no reserve. Highest bid wins at close.</p></>)}
            {meta.isExpress && (<><input className="ldp-bid-input" placeholder="Enter your sealed bid (₹)" /><p className="ldp-bid-note">Sealed-bid, single round. Bids are hidden until the 24-hour window closes.</p></>)}
            {meta.isTender && (<><input className="ldp-bid-input" placeholder="Enter your tender offer (₹)" /><p className="ldp-bid-note">Multi-round sealed bid. Reserve and Expected Value disclosed after close.</p></>)}
            {meta.isBuyNow && <p className="ldp-bid-note">Fixed price — pay now to settle instantly, no bidding.</p>}

            {meta.isBuyNow ? (
              <button className="ldp-cta">{meta.ctaLabel}</button>
            ) : (
              <>
                <p className="ldp-emd-note">Bidding requires <Link to="/emd-consent">EMD consent</Link></p>
                <Link to={`/bidding-room?id=${lot.id}&format=${lot.format}`} className="ldp-cta">{meta.ctaLabel}</Link>
              </>
            )}
            <button className="ldp-watchlist">☆ Add to Watchlist</button>

            <div className="ldp-matches">
              <div><span>Category Match</span><span style={{ color: matchColor(lot.catMatch) }}>{lot.catMatch}</span></div>
              <div><span>Location Match</span><span style={{ color: matchColor(lot.locMatch) }}>{lot.locMatch}</span></div>
              <div><span>Value Match</span><span style={{ color: matchColor(lot.valMatch) }}>{lot.valMatch}</span></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
