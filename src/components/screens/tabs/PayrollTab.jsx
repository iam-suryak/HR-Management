import React, { useState } from 'react';
import { 
  CreditCard, ArrowDownRight, ArrowUpRight, Download, 
  FileText, ShieldCheck, DollarSign, ChevronRight, CheckCircle2, AlertCircle, Plus 
} from 'lucide-react';

export default function PayrollTab({ onShowNotification, profileData }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPayslip = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onShowNotification?.({
        title: "Payslip Downloaded",
        message: "Work_Mate_Payslip_April_2026.pdf saved to your device.",
        type: "success"
      });
    }, 1200);
  };

  const handleClaimExpense = () => {
    onShowNotification?.({
      title: "Expense Claim Portal",
      message: "Receipt upload sheet opened. Max claim limit: $500/month.",
      type: "info"
    });
  };

  return (
    <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Sleek Digital Salary Card matching Work Mate Purple Theme */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#635BFF] via-[#5248E2] to-[#3B2D98] p-4 text-white shadow-lg shadow-[#635BFF]/25 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-purple-200 font-semibold tracking-wider uppercase block">
                NET TAKE-HOME PAY
              </span>
              <div className="text-2xl font-extrabold tracking-tight mt-0.5">
                $4,850.00
              </div>
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-end justify-between pt-2 border-t border-white/15">
            <div>
              <div className="text-[10px] text-purple-200 font-medium">Period</div>
              <div className="text-[11.5px] font-bold">01 - 30 April 2026</div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 text-[9.5px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Paid • 25 Apr</span>
              </span>
              <div className="text-[9.5px] text-purple-200 font-mono mt-0.5">Direct Deposit (•••• 4092)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleDownloadPayslip}
          disabled={downloading}
          className="bg-white hover:bg-slate-50 active:scale-95 transition-all p-3 rounded-2xl border border-slate-100/90 shadow-2xs flex items-center space-x-2 text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50 group-hover:bg-[#635BFF] text-[#635BFF] group-hover:text-white flex items-center justify-center transition flex-shrink-0">
            <Download className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">
              {downloading ? 'Downloading...' : 'Payslip PDF'}
            </div>
            <div className="text-[9.5px] text-slate-400 font-medium">April 2026 slip</div>
          </div>
        </button>

        <button
          type="button"
          onClick={handleClaimExpense}
          className="bg-white hover:bg-slate-50 active:scale-95 transition-all p-3 rounded-2xl border border-slate-100/90 shadow-2xs flex items-center space-x-2 text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition flex-shrink-0">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">Claim Expense</div>
            <div className="text-[9.5px] text-slate-400 font-medium">Reimbursements</div>
          </div>
        </button>
      </div>

      {/* Detailed Earnings & Deductions Breakdown */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-50">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            SALARY BREAKDOWN
          </span>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Verified by HR
          </span>
        </div>

        {/* Earnings */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Earnings
          </span>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Base Salary (Junior Full Stack)</span>
            <span className="font-bold text-slate-900">$4,200.00</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Remote & Housing Allowance</span>
            <span className="font-bold text-slate-900">+$650.00</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Overtime Bonus (4.5 Hours)</span>
            <span className="font-bold text-emerald-600">+$180.00</span>
          </div>
        </div>

        {/* Deductions */}
        <div className="space-y-2 pt-2 border-t border-slate-50">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Deductions & Taxes
          </span>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Income Tax Withholding (PPH 21)</span>
            <span className="font-bold text-rose-500">-$120.00</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Healthcare & Insurance Premium</span>
            <span className="font-bold text-rose-500">-$60.00</span>
          </div>
        </div>

        {/* Total Net */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">Total Net Disbursed</span>
            <span className="text-[10px] text-slate-400">Deposited to BCA •••• 4092</span>
          </div>
          <span className="text-base font-extrabold text-[#635BFF]">$4,850.00</span>
        </div>
      </div>

      {/* Reimbursement Claims History */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100/90 shadow-2xs space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          RECENT EXPENSE CLAIMS
        </span>

        <div className="divide-y divide-slate-50">
          <div className="py-2 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">Ergonomic Monitor Desk Hub</div>
              <div className="text-[10px] text-slate-400">18 April • Hardware Claim</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">$120.00</div>
              <span className="text-[9.5px] font-bold text-emerald-600">Approved</span>
            </div>
          </div>

          <div className="py-2 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">Team Engineering Lunch</div>
              <div className="text-[10px] text-slate-400">12 April • Meal Allowance</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">$45.00</div>
              <span className="text-[9.5px] font-bold text-emerald-600">Reimbursed</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
