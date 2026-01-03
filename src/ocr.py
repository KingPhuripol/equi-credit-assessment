from __future__ import annotations

import hashlib
from datetime import date, timedelta
from typing import Any


def mock_typhoon_ocr(image_bytes: bytes) -> list[dict[str, Any]]:
    """Simulated Typhoon OCR.

    In production, this is where you'd call Typhoon OCR with your API key:
    - Read image bytes
    - Send to Typhoon OCR endpoint
    - Receive structured JSON

    Example (placeholder):
        headers = {"Authorization": f"Bearer {TYPHOON_API_KEY}"}
        requests.post("https://api.typhoon-ocr.example/v1/extract", ...)

    For this demo we return deterministic Thai transactions based on a hash of the image.
    """

    h = hashlib.sha256(image_bytes).hexdigest()
    seed = int(h[:8], 16)

    # Small deterministic pattern so multiple uploaded docs produce different mixes.
    base = date(2025, 12, 1) + timedelta(days=(seed % 21))

    # Thai descriptions required by spec.
    templates = [
        ("ลูกค้าโอน", 4200.0, "Income"),
        ("ขายของ", 1800.0, "Income"),
        ("ค่าจ้าง freelance", 3500.0, "Income"),
        ("ค่าวัตถุดิบ", 950.0, "Expense"),
        ("โอนให้แม่", 800.0, "Expense"),
        ("ค่าเช่าแผง", 1200.0, "Expense"),
        ("ค่าเดินทาง", 220.0, "Expense"),
        ("ลูกค้าโอน (งวดงาน)", 5200.0, "Income"),
    ]

    # Rotate selection based on seed.
    start = seed % len(templates)
    chosen = templates[start:] + templates[:start]
    chosen = chosen[:6]

    out: list[dict[str, Any]] = []
    for i, (desc, amount, typ) in enumerate(chosen):
        out.append(
            {
                "date": (base + timedelta(days=i * 3)).isoformat(),
                "description": desc,
                "amount": float(amount),
                "type": typ,
            }
        )

    return out
