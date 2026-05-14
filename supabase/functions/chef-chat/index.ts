import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { messages, context } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'messages array required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'AI not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let contextBlock = '';
    if (context) {
      contextBlock = `\n\n## User context (use this to personalize advice)\n` +
        `- Profile: ${context.profile?.weight}kg, ${context.profile?.height}cm, ${context.profile?.age}y, ${context.profile?.gender}, ${context.profile?.activityLevel}, goal: ${context.profile?.goalType}\n` +
        `- Daily calorie target: ${context.targetCalories} kcal\n` +
        `- Today consumed: ${context.todayCalories ?? 0} kcal (${context.todayProtein ?? 0}g protein)\n` +
        (context.goals?.length
          ? `- Active goals:\n${context.goals.map((g: any) =>
              `  • [${g.type}] ${g.title}${g.description ? ` — ${g.description}` : ''}` +
              (g.target_weight ? ` (target weight: ${g.target_weight}kg)` : '') +
              (g.target_calories ? ` (daily kcal: ${g.target_calories})` : '') +
              (g.target_workouts ? ` (workouts: ${g.target_workouts})` : '') +
              ` — ${g.daysLeft} days left`
            ).join('\n')}\n`
          : '- No active goals set\n');
    }

    const systemPrompt = `You are a friendly Pakistani/Desi nutrition + fitness coach inside the NIM Fitness Tracker app.

You do TWO things:
1. **Recipe mode** — when the user lists ingredients, suggest 2-4 healthy desi dishes (chilla, daal, karahi, omelette, sabzi, etc.) with macros (kcal/protein/carbs/fats) and a "make it healthier" tip per dish.
2. **Coach mode** — when the user asks about goals, weight loss/gain, progress, or how to achieve a target, give a concrete plan: daily calorie split, protein target, sample meal ideas tied to their goal, workout suggestion, and what to avoid. Reference their active goals and current intake when relevant. Show empathy, be motivating, and keep advice practical for Pakistan (Pakistani foods, affordable options).

Always use markdown: short headings, bullets, occasional emoji. Keep replies tight — no fluff.${contextBlock}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again shortly.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits in workspace settings.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: text }), {
        status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
