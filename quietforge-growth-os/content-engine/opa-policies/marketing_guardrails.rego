package quietforge.marketing.guardrails

default allow = false

# allow is true ONLY if target_cpa < (0.40 * gross_margin)
allow {
    # Verify input schema exists and inputs are numbers
    is_number(input.target_cpa)
    is_number(input.gross_margin)
    
    # Enforce positive economics
    input.gross_margin > 0
    input.target_cpa >= 0
    
    # Core mathematical guardrail (maximum 40% gross margin on CPA acquisition cost)
    input.target_cpa < (0.40 * input.gross_margin)
}
