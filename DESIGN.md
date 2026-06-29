# DESIGN — НЕТПЮС ПЕТРИЧ

## Color Strategy
Restrained с един акцент. Тинтнати неутрални към синьо. OKLCH-мислене.

## Palette
- **ink** (дълбоко синьо, primary): `#0a2540` — доверие, морски дълбочини. NEVER `#000`.
- **brand** (циан, accent ≤10%): `#00b4d8` — скорост, интернет. Използвай пестеливо за акценти.
- **accent** (оранжево, CTA): `#ff9f0a` — енергия. Само за primary action.
- **ash** (студено сиво): `#f8fafc → #0f172a` — тинтнати към ink, никога чисто неутрално.

## Typography
- **Inter** — body, UI текст. Cap line-length 65–75ch.
- **Manrope** — заглавия (display). Повече character.
- Йерархия чрез scale + weight (≥1.25 ratio). Title case, не All-caps за заглавия.

## Elevation
- Сенките носят hue на ink (синьо), не чисто черно.
- `--shadow-xs/soft/lift/glow/accent` скала.
- Тинтнани: `rgba(10, 37, 64, ...)`.

## Texture
- Mesh градиенти (радиални петна) за дълбочина, не плоски linear.
- Noise/grain overlay (`bg-noise`) за разбиване на цифровата плоскост.

## Components
- **Картите не са default** — само когато са най-добрия affordance. Без вложени карти.
- **Специални повърхности**: glass (рядко, целенасочено), spotlight borders (карти светят под курсора).
- **Бутони**: rounded-full, accent за primary, outline за secondary. Active press feedback.

## Motion
- Ease-out-expo/quint. Без bounce/elastic.
- Scroll reveal (IntersectionObserver). `prefers-reduced-motion` се зачита.
- Spotlight проследява курсора.

## Bans (от impeccable skill)
- ❌ Gradient text (bg-clip-text)
- ❌ Side-stripe borders
- ❌ Glassmorphism като default
- ❌ Hero-metric template (big number + label)
- ❌ Еднакви карти в grid
- ❌ Модал като първа мисъл
