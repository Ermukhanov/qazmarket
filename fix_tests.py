with open(r'C:\Users\Acer Nitro\.gemini\antigravity\scratch\qazmarket\tests\run_tests.js', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace("aside[aria-label='Бүйірлік навигация']", "aside[aria-label='Басты навигация']")

with open(r'C:\Users\Acer Nitro\.gemini\antigravity\scratch\qazmarket\tests\run_tests.js', 'w', encoding='utf-8') as f:
    f.write(c)
print('Updated run_tests.js with correct sidebar aria-label')
