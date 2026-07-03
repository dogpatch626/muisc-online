# Gourmega Architecture Paths

## Approach A: Serverless Static
```mermaid
graph TB
    subgraph "Netlify"
        FE_A[React + Vite + Tailwind<br/>Static Frontend]
        SF_A[Netlify Serverless Functions<br/>Square / WhatsApp / Sheets]
    end

    subgraph "Supabase"
        DB_A[(PostgreSQL Database)]
        AUTH_A[Supabase Auth]
        RLS_A[Row Level Security<br/>Business Logic lives here]
    end

    subgraph "External APIs"
        SQ_A[Square API]
        WA_A[WhatsApp Business API]
        GS_A[Google Sheets API]
        GC_A[Google Calendar API]
    end

    subgraph "Bolt-On Scheduler"
        CRON_A[Supabase Edge Functions<br/>or 3rd Party Cron<br/>Scheduled WhatsApp messages]
    end

    FE_A -->|Direct connection| DB_A
    FE_A -->|Login| AUTH_A
    FE_A -->|Triggers| SF_A
    SF_A --> SQ_A
    SF_A --> WA_A
    SF_A --> GS_A
    SF_A --> GC_A
    CRON_A -.->|Bolt-on| WA_A
    CRON_A -.->|Reads| DB_A

    style CRON_A fill:#8B0000,color:#fff
    style RLS_A fill:#8B0000,color:#fff
```

## Approach B: Lightweight Backend (Recommended)
```mermaid
graph TB
    subgraph "Vercel / Netlify"
        subgraph "Next.js Monolith"
            FE_B[React Frontend<br/>Tailwind CSS]
            API_B[API Routes<br/>All Business Logic]
            CRON_B[Vercel Cron / pg_cron<br/>Scheduled Jobs]
        end
    end

    subgraph "Supabase"
        DB_B[(PostgreSQL Database)]
        AUTH_B[Supabase Auth]
    end

    subgraph "External APIs"
        SQ_B[Square API<br/>Webhooks hit API routes]
        WA_B[WhatsApp Business API]
        GS_B[Google Sheets API]
        GC_B[Google Calendar API]
    end

    FE_B -->|Internal calls| API_B
    API_B -->|Read/Write| DB_B
    API_B -->|Login| AUTH_B
    API_B --> SQ_B
    API_B --> WA_B
    API_B --> GS_B
    API_B --> GC_B
    SQ_B -->|Payment webhooks| API_B
    CRON_B -->|Triggers| API_B

    style API_B fill:#2E7D32,color:#fff
    style CRON_B fill:#2E7D32,color:#fff
```

## Approach C: Decoupled Services
```mermaid
graph TB
    subgraph "Frontend Host (Netlify/Vercel)"
        FE_C[React SPA<br/>Tailwind CSS]
    end

    subgraph "Backend Host (Railway/Render/Fly)"
        API_C[Express or Fastify<br/>API Server]
        CRON_C[Built-in Scheduler<br/>node-cron / Agenda]
    end

    subgraph "Supabase"
        DB_C[(PostgreSQL Database)]
        AUTH_C[Supabase Auth]
    end

    subgraph "External APIs"
        SQ_C[Square API]
        WA_C[WhatsApp Business API]
        GS_C[Google Sheets API]
        GC_C[Google Calendar API]
    end

    FE_C -->|HTTP/REST| API_C
    API_C -->|Read/Write| DB_C
    API_C -->|Auth verify| AUTH_C
    API_C --> SQ_C
    API_C --> WA_C
    API_C --> GS_C
    API_C --> GC_C
    SQ_C -->|Webhooks| API_C
    CRON_C -->|Internal| API_C

    style API_C fill:#1565C0,color:#fff
    style FE_C fill:#1565C0,color:#fff
```

## Side-by-Side Comparison
```mermaid
graph LR
    subgraph "A: Serverless Static"
        A1[Cheapest] --> A2[Scattered Logic]
        A2 --> A3[Cron is a hack]
        A3 --> A4[No webhook home]
    end

    subgraph "B: Next.js Full-Stack"
        B1[One codebase] --> B2[Logic centralized]
        B2 --> B3[Native cron]
        B3 --> B4[Webhook routes built-in]
    end

    subgraph "C: Decoupled"
        C1[Clean separation] --> C2[Two deploys]
        C2 --> C3[More infra]
        C3 --> C4[Overkill at this scale]
    end

    style B1 fill:#2E7D32,color:#fff
    style B2 fill:#2E7D32,color:#fff
    style B3 fill:#2E7D32,color:#fff
    style B4 fill:#2E7D32,color:#fff

    style A3 fill:#8B0000,color:#fff
    style A4 fill:#8B0000,color:#fff

    style C3 fill:#8B0000,color:#fff
    style C4 fill:#8B0000,color:#fff
```

## Booking Flow: Ceremony Night (Single Seating)
```mermaid
flowchart TD
    subgraph "DROP RELEASE"
        A[Franc creates dinner date in OS<br/>Sets night type, max covers, status: Open] --> B[Drop page goes live<br/>gourmega.com/drop/date]
        B --> C[Franc shares link<br/>Instagram DM / WhatsApp]
    end

    subgraph "THREE SEAT TIERS"
        C --> VIP[VIP - The Table: 6 seats<br/>Franc invites directly]
        C --> LOTTERY[Lottery - The Drop: 8 seats<br/>Guests request via drop page]
        C --> DOOR[Door: 4 seats<br/>Held for walk-ins day-of]
    end

    subgraph "GUEST REQUEST via Drop Page"
        LOTTERY --> D[Guest lands on drop page<br/>Sees seat grid, availability]
        D --> E[Step 1: Select party size<br/>Tap 1-6 circles]
        E --> F[Step 2: Submit details<br/>Name, email, WhatsApp, occasion, allergies]
        F --> G[Request submitted<br/>Status: PENDING]
    end

    subgraph "FRANC CURATES"
        G --> H{Franc reviews request pool}
        VIP --> H
        H -->|Approved| I[Status: SELECTED]
        H -->|Denied| J[Status: DECLINED<br/>No notification sent]
        H -->|Maybe later| K[Status: WAITLISTED]
    end

    subgraph "DEPOSIT and CONFIRMATION"
        I --> L[WhatsApp sent to guest<br/>Confirmation + Square deposit link + Cal invite]
        L --> M{Guest pays deposit?}
        M -->|Square webhook confirms| N[Status: CONFIRMED<br/>Deposit: PAID]
        M -->|No payment within window| O[Status: EXPIRED<br/>Seat released back to pool]
    end

    subgraph "SYSTEM UPDATES"
        N --> P[Guest Oracle row created<br/>Supabase + Google Sheets sync]
        N --> Q[Seat grid updates<br/>Drop page reflects in real time]
        N --> R[Dashboard updates<br/>Cover count, dietary flags, roti]
    end

    subgraph "AUTOMATED MESSAGES - Scheduled"
        N --> S1[T-48h: Reminder<br/>Date, time, address, dietary check]
        S1 --> S2[Day-of 10AM: Morning hype<br/>Occasion variant if birthday]
        S2 --> S3[Day-of 5PM: 2hr reminder<br/>Grace period notice]
    end

    subgraph "WAITLIST FLOW"
        K --> T[Waitlist queue<br/>Ranked by position]
        O --> U{Open seat?}
        U -->|Yes| V[Top waitlist guest notified<br/>via WhatsApp]
        V --> L
    end

    style H fill:#C4A882,color:#000
    style N fill:#2E7D32,color:#fff
    style J fill:#8B0000,color:#fff
    style O fill:#8B0000,color:#fff
```

## Booking Flow: Prix Fixe Night (Three Seatings)
```mermaid
flowchart TD
    subgraph "DROP RELEASE"
        A[Franc creates Prix Fixe night<br/>OS generates 3 seatings: 5:30 / 7:00 / 8:30] --> B[Each slot gets own seat pool<br/>18 seats x 3 = 54 total covers]
        B --> C[Drop page goes live<br/>Shows 3 time slots with availability]
    end

    subgraph "GUEST REQUEST"
        C --> D[Guest picks a time slot<br/>Only open slots are selectable]
        D --> E[Guest selects party size<br/>Capped by remaining seats in that slot]
        E --> F[Guest submits details<br/>Same form as Ceremony]
        F --> G[Request submitted<br/>Tagged to specific slot]
    end

    subgraph "CURATION PER SLOT"
        G --> H{Franc reviews each slot independently}
        H -->|5:30 pool| I1[Select / Decline / Waitlist]
        H -->|7:00 pool| I2[Select / Decline / Waitlist]
        H -->|8:30 pool| I3[Select / Decline / Waitlist]
    end

    subgraph "PER-SLOT MANAGEMENT"
        I1 --> J[Each slot has its own:<br/>Guest Oracle tab<br/>Cover + roti + dietary totals<br/>Kitchen service sheet]
        I2 --> J
        I3 --> J
    end

    subgraph "SLOT INDEPENDENCE"
        J --> K[Franc can open/close slots independently<br/>e.g. 5:30 sold out, 8:30 still open]
        K --> L[VIP + Door seats apply per slot<br/>not per night]
    end

    style H fill:#C4A882,color:#000
    style J fill:#2E7D32,color:#fff
```

## Guest Lifecycle: End to End
```mermaid
flowchart LR
    subgraph "DISCOVERY"
        A[Franc shares drop link<br/>IG DM or WhatsApp]
    end

    subgraph "REQUEST"
        B[Guest lands on drop page]
        C[Submits seat request]
    end

    subgraph "CURATION"
        D[Franc reviews]
        E{Decision}
    end

    subgraph "PAYMENT"
        F[WhatsApp: deposit link sent]
        G[Guest pays via Square]
        H[Webhook confirms payment]
    end

    subgraph "PRE-DINNER"
        I[T-48h reminder]
        J[Day-of morning hype]
        K[Day-of 2hr reminder]
    end

    subgraph "DINNER"
        L[Guest arrives<br/>Oracle used by kitchen]
    end

    A --> B --> C --> D --> E
    E -->|Selected| F --> G --> H
    E -->|Waitlisted| W[Waitlist queue]
    E -->|Declined| X[Silent - no notification]
    H --> I --> J --> K --> L
    W -.->|Spot opens| F

    style E fill:#C4A882,color:#000
    style H fill:#2E7D32,color:#fff
    style X fill:#8B0000,color:#fff
```
