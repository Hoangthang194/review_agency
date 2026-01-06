"use client";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "delete" | "warning" | "info";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "delete",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "delete":
        return {
          icon: "delete",
          iconBg: "bg-red-100 dark:bg-red-900/20",
          iconColor: "text-red-600 dark:text-red-400",
          buttonBg: "bg-red-600 hover:bg-red-700",
        };
      case "warning":
        return {
          icon: "warning",
          iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          buttonBg: "bg-yellow-600 hover:bg-yellow-700",
        };
      default:
        return {
          icon: "info",
          iconBg: "bg-blue-100 dark:bg-blue-900/20",
          iconColor: "text-blue-600 dark:text-blue-400",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`${styles.iconBg} w-16 h-16 rounded-full flex items-center justify-center`}>
              <span className={`material-icons-outlined ${styles.iconColor} text-3xl`}>
                {styles.icon}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-3 ${styles.buttonBg} text-white rounded-lg font-medium transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

