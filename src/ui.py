import streamlit as st


def inject_global_css() -> None:
    st.markdown(
        """
        <style>
          :root {
            --navy: #0B2A4A;
            --navy-2: #123B66;
            --bg: #F5F7FB;
            --card: #FFFFFF;
            --text: #0F172A;
            --muted: #475569;
            --border: #E5E7EB;
          }

          .stApp { background: var(--bg); }

          /* Remove extra padding and keep a corporate frame */
          section.main > div { padding-top: 1.25rem; }

          .topbar {
            background: linear-gradient(90deg, var(--navy), var(--navy-2));
            color: white;
            border-radius: 14px;
            padding: 18px 22px;
            border: 1px solid rgba(255,255,255,0.12);
          }

          .topbar-title { font-size: 26px; font-weight: 700; letter-spacing: 0.2px; }
          .topbar-sub { margin-top: 4px; font-size: 14px; opacity: 0.92; }

          .hero {
            background: linear-gradient(90deg, rgba(11,42,74,0.98), rgba(18,59,102,0.92));
            color: white;
            border-radius: 18px;
            padding: 36px;
            border: 1px solid rgba(255,255,255,0.14);
          }

          .hero-kicker { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85; }
          .hero-title { font-size: 40px; font-weight: 800; margin-top: 8px; line-height: 1.15; }
          .hero-lead { margin-top: 10px; font-size: 16px; opacity: 0.92; max-width: 780px; }

          .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 18px 18px;
          }
          .card-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
          .muted { color: var(--muted); font-size: 13px; }
          .section-title { margin-top: 14px; font-weight: 800; font-size: 15px; color: var(--text); }
          .spacer { height: 12px; }

          .value-prop {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 18px;
          }
          .value-title { font-weight: 800; color: var(--text); font-size: 14px; }
          .value-body { margin-top: 6px; color: var(--muted); font-size: 13px; line-height: 1.45; }

          .kv { margin-top: 8px; }
          .kv-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); }
          .kv-row:last-child { border-bottom: 0; }
          .kv-k { color: var(--muted); font-size: 13px; }
          .kv-v { color: var(--text); font-weight: 700; font-size: 13px; }

          .report { margin-top: 8px; border: 1px solid var(--border); border-radius: 12px; padding: 12px; background: #FFFFFF; }
          .report-row { display:flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); }
          .report-row:last-child { border-bottom: 0; }
          .report-k { color: var(--muted); font-size: 13px; }
          .report-v { color: var(--text); font-weight: 800; font-size: 13px; }

          .bar-row { display:flex; align-items:center; gap: 12px; margin: 10px 0; }
          .bar-label { width: 160px; color: var(--muted); font-size: 13px; }
          .bar-track { flex: 1; height: 10px; border-radius: 999px; background: #EEF2F7; overflow: hidden; border: 1px solid var(--border); }
          .bar-fill { height: 100%; border-radius: 999px; }
          .bar-fill.positive { background: rgba(11,42,74,0.88); }
          .bar-fill.negative { background: rgba(148,163,184,0.95); }
          .bar-value { width: 72px; text-align: right; font-variant-numeric: tabular-nums; color: var(--text); font-weight: 700; font-size: 12px; }

          /* Streamlit buttons: keep them corporate */
          div.stButton > button {
            border-radius: 10px;
            border: 1px solid rgba(11,42,74,0.22);
            padding: 0.6rem 0.9rem;
            font-weight: 700;
          }
          div.stButton > button[kind="primary"] {
            background: var(--navy);
            color: white;
            border: 1px solid rgba(11,42,74,0.25);
          }

          /* Hide Streamlit footer/menu for a more official feel */
          #MainMenu {visibility: hidden;}
          footer {visibility: hidden;}
          header {visibility: hidden;}
        </style>
        """,
        unsafe_allow_html=True,
    )


def render_home() -> bool:
    # Landing Page
    st.markdown(
        """
        <div class='hero'>
          <div class='hero-kicker'>CREDITNEXT</div>
          <div class='hero-title'>Unlock Your Financial Potential with AI.</div>
          <div class='hero-lead'>
            CreditNext simulates a bank-ready credit assessment for freelancers using Thai-optimized OCR, industry classification,
            and explainable ML scoring.
          </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)

    c1, c2, c3 = st.columns(3, gap="large")
    with c1:
        st.markdown(
            """
            <div class='value-prop'>
              <div class='value-title'>Upload Docs</div>
              <div class='value-body'>Submit statement/bill images to begin assessment.</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with c2:
        st.markdown(
            """
            <div class='value-prop'>
              <div class='value-title'>Typhoon OCR Analysis</div>
              <div class='value-body'>Simulated Thai-optimized OCR extracts transactions.</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with c3:
        st.markdown(
            """
            <div class='value-prop'>
              <div class='value-title'>Get Certified Score</div>
              <div class='value-body'>Explainable AI score with a bank-ready report.</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

    st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)

    started = st.button("Start Assessment", type="primary", use_container_width=True)
    return bool(started)


def render_app_header() -> None:
    st.markdown(
        """
        <div class='topbar'>
          <div class='topbar-title'>CreditNext Assessment</div>
          <div class='topbar-sub'>AI-Powered Credit Scoring for Freelancers • OCR → Industry NLP → XGBoost + Explainability</div>
        </div>
        """,
        unsafe_allow_html=True,
    )
    st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)
