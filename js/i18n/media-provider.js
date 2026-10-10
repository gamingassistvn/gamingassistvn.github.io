// ---------------------------------------------------------------------------
// BillSnap AI - Media & Visual Assets Provider (media-provider.js)
// Modular slot-based media repository supporting localized screenshots & video
// ---------------------------------------------------------------------------
window.BILLSNAP_MEDIA = {
  getMedia: function(lang) {
    const isVi = (lang === 'vi');
    const folder = isVi ? 'vi' : 'en';

    return {
      icon: 'assets/billsnap/app_icon.png',
      hero_screen: `assets/billsnap/screens/${folder}/01_home_ledger.png`,
      video_demo: 'assets/billsnap/demo_video.mp4',
      gallery: [
        {
          src: `assets/billsnap/screens/${folder}/01_home_ledger.png`,
          title: isVi ? "Sổ Thu Chi Thông Minh" : "Smart Ledger & Expense Log",
          desc: isVi ? "Quản lý dòng tiền và các khoản chi khấu trừ thuế trực quan" : "Organized overview of all business deductible expenses"
        },
        {
          src: `assets/billsnap/screens/${folder}/02_receipt_detail.png`,
          title: isVi ? "Chi Tiết Hóa Đơn Trích Xuất AI" : "AI Extracted Receipt Details",
          desc: isVi ? "Đọc chuẩn xác tên nhà cung cấp, ngày tháng, tổng tiền và thuế VAT" : "Precise extraction of vendor, total, tax, and itemized lines"
        },
        {
          src: `assets/billsnap/screens/${folder}/07_us_tax_market_hub.png`,
          title: isVi ? "Mẫu Thuế Chuẩn Hóa IRS Form 1040" : "IRS Schedule C & Tax Market Hub",
          desc: isVi ? "48 dòng chi phí khấu trừ thuế theo chuẩn mẫu IRS Schedule C" : "48 standard IRS deduction categories for seamless filing"
        },
        {
          src: `assets/billsnap/screens/${folder}/04_analytics_dashboard.png`,
          title: isVi ? "Phân Tích Tài Chính Trực Quan" : "Visual Expense Analytics",
          desc: isVi ? "Theo dõi tỷ trọng chi tiêu và ước tính số tiền khấu trừ thuế" : "Track spending trends and estimated tax deduction savings"
        },
        {
          src: `assets/billsnap/screens/${folder}/06_reports_export_sheet.png`,
          title: isVi ? "Xuất Báo Cáo Excel & PDF" : "1-Tap Audit-Ready Reports",
          desc: isVi ? "Xuất bảng tính Form 1040 Schedule C và phụ lục ảnh hóa đơn gốc" : "Export Form 1040 Excel worksheets and PDF receipt photo annexes"
        },
        {
          src: `assets/billsnap/screens/${folder}/05_cloud_backup_privacy.png`,
          title: isVi ? "Bảo Mật & Sao Lưu Đa Nền Tảng" : "100% Privacy & Cross-Device Backup",
          desc: isVi ? "Dữ liệu lưu trên máy, sao lưu trơn tru giữa iPhone và Android" : "Encrypted on-device SQLite, transfer seamlessly iOS ⇄ Android"
        }
      ]
    };
  }
};
