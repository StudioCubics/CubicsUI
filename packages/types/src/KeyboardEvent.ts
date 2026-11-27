/** Represents a lowercase alphabetic key (`a`–`z`). */
type KeyboardEventLetterKey =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

/** Represents a numeric digit key (`0`–`9`). */
export type KeyboardEventDigitKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

/** Represents punctuation and symbol keys, including shifted characters. */
export type KeyboardEventPunctuationKey =
  | "/"
  | "."
  | ","
  | ";"
  | "'"
  | "["
  | "]"
  | "\\"
  | "-"
  | "="
  | "`"
  | "~"
  | "!"
  | "@"
  | "#"
  | "$"
  | "%"
  | "^"
  | "&"
  | "*"
  | "("
  | ")"
  | "_"
  | "+"
  | "{"
  | "}"
  | "|"
  | ":"
  | '"'
  | "<"
  | ">"
  | "?";

/** Represents keyboard modifier keys and modifier-lock keys. */
export type KeyboardEventModifierKey =
  | "Control"
  | "Shift"
  | "Alt"
  | "Meta"
  | "AltGraph"
  | "CapsLock"
  | "Fn"
  | "FnLock"
  | "NumLock"
  | "ScrollLock"
  | "Super"
  | "Hyper"
  | "Symbol"
  | "SymbolLock";

/** Represents whitespace and line-control keys, such as Enter, Tab, and Space. */
export type KeyboardEventWhitespaceKey = "Enter" | "Tab" | " ";

/** Represents keyboard navigation keys, such as arrows, Home, End, and PageUp. */
export type KeyboardEventNavigationKey =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Home"
  | "End"
  | "PageUp"
  | "PageDown";

/** Represents text editing and clipboard-related keys. */
export type KeyboardEventEditingKey =
  | "Backspace"
  | "Delete"
  | "Insert"
  | "Clear"
  | "Copy"
  | "Cut"
  | "Paste"
  | "Undo"
  | "Redo";

/** Represents general user-interface keys, such as Escape, ContextMenu, and Pause. */
export type KeyboardEventUIKey =
  | "Escape"
  | "ContextMenu"
  | "Pause"
  | "Play"
  | "Find"
  | "Help"
  | "Select"
  | "Cancel"
  | "Execute"
  | "ZoomIn"
  | "ZoomOut";

/** Represents function keys (`F1`–`F24`). */
export type KeyboardEventFunctionKey =
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
  | "F13"
  | "F14"
  | "F15"
  | "F16"
  | "F17"
  | "F18"
  | "F19"
  | "F20"
  | "F21"
  | "F22"
  | "F23"
  | "F24";

/** Represents media playback and audio volume keys. */
export type KeyboardEventMediaKey =
  | "MediaPlayPause"
  | "MediaStop"
  | "MediaTrackNext"
  | "MediaTrackPrevious"
  | "AudioVolumeUp"
  | "AudioVolumeDown"
  | "AudioVolumeMute";

/** Represents special keyboard event values. */
export type KeyboardEventSpecialKey = "Unidentified";

/** Represents additional text editing and selection keys. */
export type KeyboardEventEditingKeyExtra = "CrSel" | "EraseEof" | "ExSel";

/** Represents additional user-interface keys. */
export type KeyboardEventUIKeyExtra = "Accept" | "Again" | "Attn" | "Props";

/** Represents hardware and device-control keys. */
export type KeyboardEventDeviceKey =
  | "BrightnessDown"
  | "BrightnessUp"
  | "Eject"
  | "Hibernate"
  | "LogOff"
  | "Power"
  | "PowerOff"
  | "PrintScreen"
  | "Standby"
  | "WakeUp";

/** Represents input method editor (IME) and composition keys. */
export type KeyboardEventIMEKey =
  | "AllCandidates"
  | "Alphanumeric"
  | "CodeInput"
  | "Compose"
  | "Convert"
  | "Dead"
  | "FinalMode"
  | "GroupFirst"
  | "GroupLast"
  | "GroupNext"
  | "GroupPrevious"
  | "ModeChange"
  | "NextCandidate"
  | "NonConvert"
  | "PreviousCandidate"
  | "Process"
  | "SingleCandidate"
  | "HangulMode"
  | "HanjaMode"
  | "JunjaMode"
  | "Eisu"
  | "Hankaku"
  | "Hiragana"
  | "HiraganaKatakana"
  | "KanaMode"
  | "KanjiMode"
  | "Katakana"
  | "Romaji"
  | "Zenkaku"
  | "ZenkakuHankaku";

/** Represents additional multimedia playback keys. */
export type KeyboardEventMediaKeyExtra =
  | "MediaFastForward"
  | "MediaPause"
  | "MediaPlay"
  | "MediaRecord"
  | "MediaRewind"
  | "MediaClose";

/** Represents additional audio control keys. */
export type KeyboardEventAudioKey =
  | "AudioBalanceLeft"
  | "AudioBalanceRight"
  | "AudioBassBoostDown"
  | "AudioBassBoostToggle"
  | "AudioBassBoostUp"
  | "AudioFaderFront"
  | "AudioFaderRear"
  | "AudioSurroundModeNext"
  | "AudioTrebleDown"
  | "AudioTrebleUp"
  | "MicrophoneToggle"
  | "MicrophoneVolumeDown"
  | "MicrophoneVolumeUp"
  | "MicrophoneVolumeMute";

/** Represents general-purpose virtual function keys. */
export type KeyboardEventSoftKey = "Soft1" | "Soft2" | "Soft3" | "Soft4";

/** Represents extra keys found on multimedia keyboards, such as channel, mail, and document actions. */
export type KeyboardEventMultimediaKey =
  | "ChannelDown"
  | "ChannelUp"
  | "Close"
  | "MailForward"
  | "MailReply"
  | "MailSend"
  | "New"
  | "Open"
  | "Print"
  | "Save"
  | "SpellCheck";

/** Represents extra numpad keys found on multimedia keypads numbered `1`–`12`. */
export type KeyboardEventMultimediaNumpadKey = "Key11" | "Key12";

/** Represents speech recognition keys. */
export type KeyboardEventSpeechKey =
  | "SpeechCorrectionList"
  | "SpeechInputToggle";

/** Represents application launch keys. */
export type KeyboardEventApplicationKey =
  | "LaunchApplication1"
  | "LaunchApplication2"
  | "LaunchCalendar"
  | "LaunchContacts"
  | "LaunchMail"
  | "LaunchMediaPlayer"
  | "LaunchMusicPlayer"
  | "LaunchPhone"
  | "LaunchScreenSaver"
  | "LaunchSpreadsheet"
  | "LaunchWebBrowser"
  | "LaunchWebCam"
  | "LaunchWordProcessor";

/** Represents browser navigation keys. */
export type KeyboardEventBrowserKey =
  | "BrowserBack"
  | "BrowserFavorites"
  | "BrowserForward"
  | "BrowserHome"
  | "BrowserRefresh"
  | "BrowserSearch"
  | "BrowserStop";

/** Represents mobile phone keys. */
export type KeyboardEventMobileKey =
  | "AppSwitch"
  | "Call"
  | "Camera"
  | "CameraFocus"
  | "EndCall"
  | "GoBack"
  | "GoHome"
  | "HeadsetHook"
  | "LastNumberRedial"
  | "Notification"
  | "MannerMode"
  | "VoiceDial";

/** Represents TV keys. */
export type KeyboardEventTVKey =
  | "TV"
  | "TV3DMode"
  | "TVAntennaCable"
  | "TVAudioDescription"
  | "TVAudioDescriptionMixDown"
  | "TVAudioDescriptionMixUp"
  | "TVContentsMenu"
  | "TVDataService"
  | "TVInput"
  | "TVInputComponent1"
  | "TVInputComponent2"
  | "TVInputComposite1"
  | "TVInputComposite2"
  | "TVInputHDMI1"
  | "TVInputHDMI2"
  | "TVInputHDMI3"
  | "TVInputHDMI4"
  | "TVInputVGA1"
  | "TVMediaContext"
  | "TVNetwork"
  | "TVNumberEntry"
  | "TVPower"
  | "TVRadioService"
  | "TVSatellite"
  | "TVSatelliteBS"
  | "TVSatelliteCS"
  | "TVSatelliteToggle"
  | "TVTerrestrialAnalog"
  | "TVTerrestrialDigital"
  | "TVTimer";

/** Represents media controller keys, such as remote controls for TVs, audio systems, and set-top boxes. */
export type KeyboardEventMediaControllerKey =
  | "AVRInput"
  | "AVRPower"
  | "ColorF0Red"
  | "ColorF1Green"
  | "ColorF2Yellow"
  | "ColorF3Blue"
  | "ColorF4Grey"
  | "ColorF5Brown"
  | "ClosedCaptionToggle"
  | "Dimmer"
  | "DisplaySwap"
  | "DVR"
  | "Exit"
  | "FavoriteClear0"
  | "FavoriteClear1"
  | "FavoriteClear2"
  | "FavoriteClear3"
  | "FavoriteRecall0"
  | "FavoriteRecall1"
  | "FavoriteRecall2"
  | "FavoriteRecall3"
  | "FavoriteStore0"
  | "FavoriteStore1"
  | "FavoriteStore2"
  | "FavoriteStore3"
  | "Guide"
  | "GuideNextDay"
  | "GuidePreviousDay"
  | "Info"
  | "InstantReplay"
  | "Link"
  | "ListProgram"
  | "LiveContent"
  | "Lock"
  | "MediaApps"
  | "MediaAudioTrack"
  | "MediaLast"
  | "MediaSkipBackward"
  | "MediaSkipForward"
  | "MediaStepBackward"
  | "MediaStepForward"
  | "MediaTopMenu"
  | "NavigateIn"
  | "NavigateNext"
  | "NavigateOut"
  | "NavigatePrevious"
  | "NextFavoriteChannel"
  | "NextUserProfile"
  | "OnDemand"
  | "Pairing"
  | "PinPDown"
  | "PinPMove"
  | "PinPToggle"
  | "PinPUp"
  | "PlaySpeedDown"
  | "PlaySpeedReset"
  | "PlaySpeedUp"
  | "RandomToggle"
  | "RcLowBattery"
  | "RecordSpeedNext"
  | "RfBypass"
  | "ScanChannelsToggle"
  | "ScreenModeNext"
  | "Settings"
  | "SplitScreenToggle"
  | "STBInput"
  | "STBPower"
  | "Subtitle"
  | "Teletext"
  | "VideoModeNext"
  | "Wink"
  | "ZoomToggle";

/** Represents the supported values of the `KeyboardEvent.key` property.
 *
 * @warning This list is not exhaustive and will never be fully exhaustive.
 * `KeyboardEvent.key` may be any Unicode character produced by the user's
 * keyboard layout, locale, or IME, and the W3C UI Events specification may add
 * new named values as new input devices are introduced. Do not assume that
 * every value a browser reports is included here.
 * @see https://www.w3.org/TR/uievents-key/ */
export type KeyboardEventKeyValue =
  | KeyboardEventModifierKey
  | KeyboardEventWhitespaceKey
  | KeyboardEventNavigationKey
  | KeyboardEventEditingKey
  | KeyboardEventUIKey
  | KeyboardEventFunctionKey
  | KeyboardEventMediaKey
  | KeyboardEventLetterKey
  | KeyboardEventDigitKey
  | KeyboardEventPunctuationKey
  | KeyboardEventSpecialKey
  | KeyboardEventEditingKeyExtra
  | KeyboardEventUIKeyExtra
  | KeyboardEventDeviceKey
  | KeyboardEventIMEKey
  | KeyboardEventMediaKeyExtra
  | KeyboardEventAudioKey
  | KeyboardEventSoftKey
  | KeyboardEventMultimediaKey
  | KeyboardEventMultimediaNumpadKey
  | KeyboardEventSpeechKey
  | KeyboardEventApplicationKey
  | KeyboardEventBrowserKey
  | KeyboardEventMobileKey
  | KeyboardEventTVKey
  | KeyboardEventMediaControllerKey;

/** Represents a combination of keyboard keys pressed together.
 * Actual values depend on browser, operating system, keyboard, and layout. */
export type KeyboardEventKeyCombo = KeyboardEventKeyValue[];

/** Represents keyboard input in one of three forms:
 * - A single key.
 * - An array of keys representing a combination.
 * - A nested array of key combinations representing alternatives.
 * @template T - The allowed key value type. Defaults to `KeyboardEventKeyValue`.*/
export type KeyboardInput<T = KeyboardEventKeyValue> = T | T[] | T[][];
