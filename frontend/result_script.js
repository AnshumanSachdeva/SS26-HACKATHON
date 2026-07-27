function pillClass(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function confidence(value) {
    if (value === undefined || value === null) return "-";

    if (value <= 1) {
        return Math.round(value * 100) + "%";
    }

    return value + "%";
}

function renderReport(result) {

    const bd = result.building_details || {};
    const ir = result.inspection_result || {};
    const sm = result.summary || {};
    const checks = result.inspection_checks || {};

    const violations = result.violations || [];
    const positives = result.positive_observations || [];
    const recs = result.recommendations || [];

    const score = ir.compliance_score ?? "-";

    let html = "";

    /* =====================================
            HERO SECTION
    ====================================== */

    html += `

<div class="card hero-score">

<h2>📊 Compliance Report</h2>

<div class="score-circle">

<div class="score-number">${score}%</div>

<div class="score-text">Compliance Score</div>

</div>

<div class="status-banner">

<div class="status-item">
<h3>Status</h3>
<p><span class="pill ${pillClass(ir.status)}">${ir.status ?? "-"}</span></p>
</div>

<div class="status-item">
<h3>Approval</h3>
<p><span class="pill ${pillClass(ir.approval_status)}">${ir.approval_status ?? "-"}</span></p>
</div>

<div class="status-item">
<h3>Risk Level</h3>
<p><span class="pill ${pillClass(ir.risk_level)}">${ir.risk_level ?? "-"}</span></p>
</div>

</div>

</div>

`;

    /* =====================================
        BUILDING DETAILS
    ====================================== */

    html += `

<div class="card">

<h2>🏢 Building Details</h2>

<div class="stat-grid">

<div class="stat">
<div class="label">Building Type</div>
<div class="value">${bd.building_type ?? "-"}</div>
</div>

<div class="stat">
<div class="label">Floors</div>
<div class="value">${bd.floors ?? "-"}</div>
</div>

<div class="stat">
<div class="label">Drawing Quality</div>
<div class="value">${bd.drawing_quality ?? "-"}</div>
</div>

</div>

</div>

`;

    /* =====================================
            SUMMARY
    ====================================== */

    html += `

<div class="card">

<h2>📋 Inspection Summary</h2>

<div class="stat-grid">

<div class="stat">
<div class="label">Rooms</div>
<div class="value">${sm.total_rooms ?? "-"}</div>
</div>

<div class="stat">
<div class="label">Checked</div>
<div class="value">${sm.rooms_checked ?? "-"}</div>
</div>

<div class="stat">
<div class="label">Violations</div>
<div class="value">${sm.total_violations ?? "-"}</div>
</div>

<div class="stat">
<div class="label">High</div>
<div class="value">${sm.high ?? 0}</div>
</div>

<div class="stat">
<div class="label">Medium</div>
<div class="value">${sm.medium ?? 0}</div>
</div>

<div class="stat">
<div class="label">Low</div>
<div class="value">${sm.low ?? 0}</div>
</div>

</div>

</div>

`;

    /* =====================================
            VIOLATIONS
    ====================================== */

    html += `<div class="card">

<h2>⚠ Detected Violations</h2>`;

    if (violations.length) {

        violations.forEach(v => {

            html += `

<div class="violation severity-${pillClass(v.severity)}">

<div class="room">

${v.room ?? "Unknown Room"} — ${v.issue ?? "Issue"}

</div>

<div class="row">

<b>Severity:</b> ${v.severity ?? "-"}

</div>

<div class="row">

<b>Confidence:</b> ${confidence(v.confidence)}

</div>

<div class="row">

<b>Current Value:</b> ${v.current_value ?? "-"}

</div>

<div class="row">

<b>Required Value:</b> ${v.required_value ?? "-"}

</div>

<div class="row">

<b>Suggestion:</b>

${v.suggestion ?? "-"}

</div>

</div>

`;

        });

    } else {

        html += `

<p style="color:green;font-weight:bold;">
✅ No violations detected.
</p>

`;

    }

    html += `</div>`;

    /* =====================================
            CHECKS
    ====================================== */

    html += `

<div class="card">

<h2>✅ Inspection Checks</h2>

<div class="stat-grid">

<div>

<h3>Passed</h3>

<ul class="plain positive">

${(checks.passed_checks || []).length ?

(checks.passed_checks).map(c => `<li>${c}</li>`).join("")

:

"<li>No passed checks available.</li>"

}

</ul>

</div>

<div>

<h3>Failed</h3>

<ul class="plain">

${(checks.failed_checks || []).length ?

(checks.failed_checks).map(c => `<li>${c}</li>`).join("")

:

"<li>🎉 No failed checks.</li>"

}

</ul>

</div>

<div>

<h3>Unable to Verify</h3>

<ul class="plain">

${(checks.unable_to_verify || []).length ?

(checks.unable_to_verify).map(c => `<li>${c}</li>`).join("")

:

"<li>Everything verified.</li>"

}

</ul>

</div>

</div>

</div>

`;

    /* =====================================
        POSITIVE OBSERVATIONS
    ====================================== */

    if (positives.length) {

        html += `

<div class="card">

<h2>👍 Positive Observations</h2>

<ul class="plain positive">

${positives.map(p => `<li>${p}</li>`).join("")}

</ul>

</div>

`;

    }

    /* =====================================
        RECOMMENDATIONS
    ====================================== */

    if (recs.length) {

        html += `

<div class="card">

<h2>💡 Recommendations</h2>

<ul class="plain recommend">

${recs.map(r => `<li>${r}</li>`).join("")}

</ul>

</div>

`;

    }

    /* =====================================
        FINAL RECOMMENDATION
    ====================================== */

    if (result.overall_recommendation) {

        html += `

<div class="card">

<h2>📌 Overall Recommendation</h2>

<p style="line-height:1.8">

${result.overall_recommendation}

</p>

</div>

`;

    }

    document.getElementById("content").innerHTML = html;

}

/* =====================================
            LOAD DATA
===================================== */

const raw = localStorage.getItem("analysisResult");

if (raw) {

    try {

        renderReport(JSON.parse(raw));

    } catch (err) {

        document.getElementById("content").innerHTML = `

<div class="card">

<h2>❌ Error</h2>

<p>Unable to parse the analysis result.</p>

</div>

`;

        console.error(err);

    }

} else {

    document.getElementById("content").innerHTML = `

<div class="card">

<h2>No Analysis Found</h2>

<p>Please upload a blueprint first.</p>

</div>

`;

}