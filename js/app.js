// app.js - Single Page Application Core Controller & State Management
import { PRESET_WORKS } from '../data/preset_works.js';
import { pipeline } from './pipeline.js';

class StoryDeepDiveApp {
  constructor() {
    this.currentWork = null;
    this.currentWorkId = 'the-tell-tale-heart';
    this.activeTab = 'tab-summary';
    
    // Highlight toggles state
    this.highlightFilters = {
      'plot': true,
      'characters': true,
      'setting-world': true,
      'meaning-theme': true,
      'literary-devices': true
    };

    // Vocab density
    this.vocabDensity = 15;
    this.vocabFilterText = '';

    // Search state
    this.searchQuery = '';
    this.searchResults = [];
    this.currentSearchIndex = -1;

    // Active Deep Dive subnode
    this.activeSubNodeId = null;

    // Quiz answers state
    this.quizSelections = {}; // { questionId: selectedIndex }

    // Notes auto-save timer
    this.notesDebounceTimer = null;

    // Uploaded file reference
    this.uploadedFile = null;

    // Popover pinned state
    this.isPopoverPinned = false;

    this.init();
  }

  async init() {
    this.bindEvents();
    this.initApiModal();

    // Restore the title/author of your last-viewed work into the input fields
    // WITHOUT automatically re-running a live analysis on every page load.
    // Click "Analyze" (or pick a preset) when you're ready to generate.
    const savedWorkId = localStorage.getItem('sdd_last_work_id');
    if (savedWorkId) {
      const presets = (typeof PRESET_WORKS !== 'undefined' ? PRESET_WORKS : (window.PRESET_WORKS || {}));
      const preset = presets[savedWorkId];
      if (preset) {
        const titleInput = document.getElementById('work-title-input');
        const authorInput = document.getElementById('work-author-input');
        if (titleInput) titleInput.value = preset.title;
        if (authorInput) authorInput.value = preset.author;
      }
    }

    // Check URL hash for tab routing
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      this.switchTab(hash);
    }
  }

  bindEvents() {
    // Top Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        if (tabId) {
          this.switchTab(tabId);
        }
      });
    });

    // Preset selector buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetId = btn.getAttribute('data-preset');
        if (presetId) {
          this.loadPreset(presetId);
        }
      });
    });

    // Generate Analysis Form
    const analyzeForm = document.getElementById('analyze-form');
    if (analyzeForm) {
      analyzeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCustomAnalysis();
      });
    }

    // File Upload Handler (Drag and drop + file input)
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-upload-input');
    const removeFileBtn = document.getElementById('remove-file-btn');

    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-indigo-500', 'bg-slate-800/80');
      });

      ['dragleave', 'dragend'].forEach(type => {
        dropZone.addEventListener(type, () => {
          dropZone.classList.remove('border-indigo-500', 'bg-slate-800/80');
        });
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-indigo-500', 'bg-slate-800/80');
        if (e.dataTransfer.files.length > 0) {
          this.handleFileSelected(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleFileSelected(e.target.files[0]);
        }
      });
    }

    if (removeFileBtn) {
      removeFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.clearUploadedFile();
      });
    }

    // Toggle Paste Custom Text Area
    const togglePasteBtn = document.getElementById('toggle-paste-btn');
    const pasteContainer = document.getElementById('paste-text-container');
    const closePasteBtn = document.getElementById('close-paste-text-btn');

    if (togglePasteBtn && pasteContainer) {
      togglePasteBtn.addEventListener('click', () => {
        pasteContainer.classList.toggle('hidden');
        if (!pasteContainer.classList.contains('hidden')) {
          const textarea = document.getElementById('paste-story-textarea');
          if (textarea) textarea.focus();
        }
      });
    }
    if (closePasteBtn && pasteContainer) {
      closePasteBtn.addEventListener('click', () => {
        pasteContainer.classList.add('hidden');
      });
    }

    // Annotation Highlight Filter Checkboxes
    document.querySelectorAll('.highlight-filter-toggle').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const category = e.target.getAttribute('data-category');
        this.highlightFilters[category] = e.target.checked;
        this.saveState();
        this.renderAnnotatedText();
      });
    });

    // Text Search Bar
    const textSearchInput = document.getElementById('text-search-input');
    const searchPrevBtn = document.getElementById('search-prev-btn');
    const searchNextBtn = document.getElementById('search-next-btn');
    const searchClearBtn = document.getElementById('search-clear-btn');

    if (textSearchInput) {
      textSearchInput.addEventListener('input', (e) => {
        this.performTextSearch(e.target.value);
      });
      textSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (e.shiftKey) {
            this.navigateSearch(-1);
          } else {
            this.navigateSearch(1);
          }
        }
      });
    }
    if (searchPrevBtn) searchPrevBtn.addEventListener('click', () => this.navigateSearch(-1));
    if (searchNextBtn) searchNextBtn.addEventListener('click', () => this.navigateSearch(1));
    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        if (textSearchInput) textSearchInput.value = '';
        this.performTextSearch('');
      });
    }

    // Text Reader Customization (Font size & Reader Themes)
    const fontSizeSlider = document.getElementById('font-size-slider');
    const textContainer = document.getElementById('annotated-text-container');
    const readerCard = document.getElementById('reader-card-wrapper');

    if (fontSizeSlider && textContainer) {
      fontSizeSlider.addEventListener('input', (e) => {
        textContainer.style.fontSize = `${e.target.value}px`;
      });
    }

    document.querySelectorAll('.reader-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        if (readerCard) {
          readerCard.classList.remove('reader-theme-dark', 'reader-theme-sepia', 'reader-theme-light');
          readerCard.classList.add(`reader-theme-${theme}`);
        }
        document.querySelectorAll('.reader-theme-btn').forEach(b => {
          b.classList.toggle('bg-slate-800', b === btn);
          b.classList.toggle('text-white', b === btn);
        });
      });
    });

    // Vocabulary Range Slider & Search Filter
    const vocabSlider = document.getElementById('vocab-density-slider');
    const vocabSliderVal = document.getElementById('vocab-density-val');
    const vocabSearchInput = document.getElementById('vocab-search-input');

    if (vocabSlider) {
      vocabSlider.addEventListener('input', (e) => {
        this.vocabDensity = parseInt(e.target.value, 10);
        if (vocabSliderVal) vocabSliderVal.textContent = this.vocabDensity;
        this.saveState();
        this.renderVocabularyTab();
        this.renderAnnotatedText();
      });
    }

    if (vocabSearchInput) {
      vocabSearchInput.addEventListener('input', (e) => {
        this.vocabFilterText = e.target.value.toLowerCase().trim();
        this.renderVocabularyTab();
      });
    }

    // Story Map Node Drawer Close Button
    const closeDrawerBtn = document.getElementById('close-plot-drawer');
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => this.closePlotDrawer());
    }

    // Deep Dive Back to Org Chart Button
    const backToOrgBtn = document.getElementById('back-to-org-btn');
    if (backToOrgBtn) {
      backToOrgBtn.addEventListener('click', () => this.showOrgChartMain());
    }

    // Deep Dive Personal Notes Textarea Auto-save & Buttons
    const subnodeNotesArea = document.getElementById('subnode-notes-textarea');
    const copyNotesBtn = document.getElementById('copy-notes-btn');
    const clearNotesBtn = document.getElementById('clear-notes-btn');

    if (subnodeNotesArea) {
      subnodeNotesArea.addEventListener('input', (e) => {
        this.handleNotesInput(e.target.value);
      });
    }

    if (copyNotesBtn && subnodeNotesArea) {
      copyNotesBtn.addEventListener('click', () => {
        if (subnodeNotesArea.value) {
          navigator.clipboard.writeText(subnodeNotesArea.value);
          this.showToast('Notes copied to clipboard!');
        } else {
          this.showToast('No notes to copy.');
        }
      });
    }

    if (clearNotesBtn && subnodeNotesArea) {
      clearNotesBtn.addEventListener('click', () => {
        if (confirm('Clear study notes for this lens?')) {
          subnodeNotesArea.value = '';
          this.handleNotesInput('');
          this.showToast('Notes cleared.');
        }
      });
    }

    // Print / PDF Export Button
    const printBtn = document.getElementById('print-export-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Regenerate Quiz Button
    const regenQuizBtn = document.getElementById('regen-quiz-btn');
    if (regenQuizBtn) {
      regenQuizBtn.addEventListener('click', () => {
        this.regenerateQuiz();
      });
    }

    // Close popover button
    const closePopoverBtn = document.getElementById('close-popover-btn');
    if (closePopoverBtn) {
      closePopoverBtn.addEventListener('click', () => {
        const popover = document.getElementById('annotation-popover');
        if (popover) popover.classList.add('hidden');
        this.isPopoverPinned = false;
      });
    }

    // Global click listener to close annotation popover when clicking outside
    document.addEventListener('click', (e) => {
      const popover = document.getElementById('annotation-popover');
      if (popover && !popover.contains(e.target) && !e.target.closest('.annotation-highlight')) {
        popover.classList.add('hidden');
        this.isPopoverPinned = false;
      }
    });

    // Window popstate / hashchange
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {
        this.switchTab(hash);
      }
    });
  }

  initApiModal() {
    const openBtn = document.getElementById('open-api-modal-btn');
    const closeBtn = document.getElementById('close-api-modal-btn');
    const modal = document.getElementById('api-settings-modal');
    const saveBtn = document.getElementById('save-api-key-btn');
    const clearBtn = document.getElementById('clear-api-key-btn');
    
    const providerSelect = document.getElementById('ai-provider-select');
    const keyInput = document.getElementById('gemini-api-key-input');
    const modelInput = document.getElementById('ai-model-input');
    const baseUrlContainer = document.getElementById('custom-base-url-container');
    const baseUrlInput = document.getElementById('ai-base-url-input');

    const updateBaseUrlVisibility = () => {
      if (providerSelect && baseUrlContainer) {
        baseUrlContainer.classList.toggle('hidden', providerSelect.value !== 'custom');
      }
    };

    if (providerSelect) {
      providerSelect.addEventListener('change', updateBaseUrlVisibility);
    }

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        const activePipeline = (typeof pipeline !== 'undefined' ? pipeline : window.pipeline);
        const config = activePipeline.getConfig();
        if (providerSelect) providerSelect.value = config.provider || 'gemini';
        if (keyInput) keyInput.value = config.apiKey || '';
        if (modelInput) modelInput.value = config.model || '';
        if (baseUrlInput) baseUrlInput.value = config.baseUrl || '';
        updateBaseUrlVisibility();
        modal.classList.remove('hidden');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    if (saveBtn && modal) {
      saveBtn.addEventListener('click', () => {
        const activePipeline = (typeof pipeline !== 'undefined' ? pipeline : window.pipeline);
        const provider = providerSelect ? providerSelect.value : 'gemini';
        const key = keyInput ? keyInput.value : '';
        const model = modelInput ? modelInput.value : '';
        const baseUrl = baseUrlInput ? baseUrlInput.value : '';

        activePipeline.setConfig(provider, key, model, baseUrl);
        modal.classList.add('hidden');
        this.showToast(`AI configuration saved for ${provider.toUpperCase()}!`);
      });
    }

    if (clearBtn && modal) {
      clearBtn.addEventListener('click', () => {
        const activePipeline = (typeof pipeline !== 'undefined' ? pipeline : window.pipeline);
        activePipeline.setConfig('gemini', '', '', '');
        if (keyInput) keyInput.value = '';
        if (modelInput) modelInput.value = '';
        if (baseUrlInput) baseUrlInput.value = '';
        modal.classList.add('hidden');
        this.showToast('API Key and custom settings cleared.');
      });
    }
  }

  switchTab(tabId) {
    if (!document.getElementById(tabId)) return;
    this.activeTab = tabId;
    window.location.hash = tabId;

    // Update nav tab buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('border-indigo-500', isTarget);
      btn.classList.toggle('text-indigo-400', isTarget);
      btn.classList.toggle('border-transparent', !isTarget);
      btn.classList.toggle('text-slate-400', !isTarget);
    });

    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });

    // Scroll to tab top
    const container = document.getElementById('main-tab-content');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async loadPreset(presetId) {
    const presets = (typeof PRESET_WORKS !== 'undefined' ? PRESET_WORKS : (window.PRESET_WORKS || {}));
    const preset = presets[presetId];
    if (!preset) return;

    this.currentWorkId = presetId;
    localStorage.setItem('sdd_last_work_id', presetId);

    // Update input fields
    const titleInput = document.getElementById('work-title-input');
    const authorInput = document.getElementById('work-author-input');
    if (titleInput) titleInput.value = preset.title;
    if (authorInput) authorInput.value = preset.author;

    this.clearUploadedFile();

    // Trigger sequential loading pipeline
    await this.runAnalysisPipeline({
      title: preset.title,
      author: preset.author,
      uploadedText: ''
    });
  }

  async loadWork(workId) {
    const presets = (typeof PRESET_WORKS !== 'undefined' ? PRESET_WORKS : (window.PRESET_WORKS || {}));
    if (presets[workId]) {
      await this.loadPreset(workId);
    } else {
      await this.loadPreset('the-tell-tale-heart');
    }
  }

  async handleFileSelected(file) {
    const fileLabel = document.getElementById('uploaded-file-name');
    const fileBadge = document.getElementById('uploaded-file-badge');
    const badgeFilename = document.getElementById('badge-filename');
    const titleInput = document.getElementById('work-title-input');

    if (fileBadge && badgeFilename) {
      badgeFilename.textContent = file.name;
      fileBadge.classList.remove('hidden');
    }
    if (fileLabel) {
      fileLabel.textContent = file.name;
    }

    // Auto-fill title if empty
    if (titleInput && !titleInput.value.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
      titleInput.value = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    }

    this.uploadedFile = file;
    this.showToast(`File attached: ${file.name}`);
  }

  clearUploadedFile() {
    this.uploadedFile = null;
    const fileInput = document.getElementById('file-upload-input');
    const fileLabel = document.getElementById('uploaded-file-name');
    const fileBadge = document.getElementById('uploaded-file-badge');

    if (fileInput) fileInput.value = '';
    if (fileLabel) fileLabel.textContent = 'Drop PDF / Photo';
    if (fileBadge) fileBadge.classList.add('hidden');
  }

  async handleCustomAnalysis() {
    const titleInput = document.getElementById('work-title-input');
    const authorInput = document.getElementById('work-author-input');
    const pasteArea = document.getElementById('paste-story-textarea');

    const title = titleInput ? titleInput.value.trim() : '';
    const author = authorInput ? authorInput.value.trim() : '';
    let uploadedText = pasteArea ? pasteArea.value.trim() : '';

    if (!title) {
      this.showToast('Please enter a Title of Work.');
      if (titleInput) titleInput.focus();
      return;
    }

    const activePipeline = (typeof pipeline !== 'undefined' ? pipeline : window.pipeline);

    if (this.uploadedFile && !uploadedText) {
      this.showToast('Extracting document text...');
      try {
        uploadedText = await activePipeline.extractTextFromFile(this.uploadedFile, (status) => {
          this.showToast(status);
        });
      } catch (err) {
        console.error('File extraction error:', err);
        this.showToast('Could not extract text. Synthesizing from title.');
      }
    }

    await this.runAnalysisPipeline({ title, author, uploadedText });
  }

  async runAnalysisPipeline(input) {
    this.showPipelineProgressModal(true);
    this.setTabsLoadingSkeleton(true);

    try {
      const activePipeline = (typeof pipeline !== 'undefined' ? pipeline : window.pipeline);
      const result = await activePipeline.runPipeline(input, (stepIndex, stepMessage, partialResult, isDone) => {
        this.updatePipelineProgress(stepIndex, stepMessage);
        
        // Sequentially render tab data as each step completes
        if (stepIndex === 0 && isDone) this.renderSummaryTab(partialResult);
        if (stepIndex === 1 && isDone) this.renderAnnotatedTextTab(partialResult);
        if (stepIndex === 2 && isDone) this.renderVocabularyTab(partialResult);
        if (stepIndex === 3 && isDone) this.renderStoryMapTab(partialResult);
        if (stepIndex === 4 && isDone) this.renderDeepDiveTab(partialResult);
        if (stepIndex === 5 && isDone) this.renderStudyPrepTab(partialResult);
      });

      this.currentWork = result;
      this.currentWorkId = result.id || result.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      localStorage.setItem('sdd_last_work_id', this.currentWorkId);

      // Load saved state for this work
      this.loadSavedState();

      // Render all components with final data
      this.renderAll();

      setTimeout(() => {
        this.showPipelineProgressModal(false);
        this.setTabsLoadingSkeleton(false);
        this.switchTab('tab-summary');
        this.showToast('Analysis complete! All 6 lenses populated.');
      }, 400);

    } catch (error) {
      console.error('Pipeline error:', error);
      this.showPipelineProgressModal(false);
      this.setTabsLoadingSkeleton(false);
      this.showToast('Error during analysis: ' + error.message);
    }
  }

  showPipelineProgressModal(show) {
    const modal = document.getElementById('pipeline-modal');
    if (modal) {
      modal.classList.toggle('hidden', !show);
    }
  }

  updatePipelineProgress(stepIndex, message) {
    const progressBar = document.getElementById('pipeline-progress-bar');
    const stepLabel = document.getElementById('pipeline-current-step');
    const stepItems = document.querySelectorAll('.pipeline-step-item');

    const percent = Math.min(100, Math.round(((stepIndex + 1) / 6) * 100));
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (stepLabel) stepLabel.textContent = message;

    stepItems.forEach((item, idx) => {
      const icon = item.querySelector('.step-icon');
      if (idx < stepIndex) {
        item.classList.add('text-emerald-400', 'font-medium');
        item.classList.remove('text-slate-400');
        if (icon) icon.innerHTML = '✓';
      } else if (idx === stepIndex) {
        item.classList.add('text-indigo-400', 'font-semibold');
        item.classList.remove('text-slate-400', 'text-emerald-400');
        if (icon) icon.innerHTML = '●';
      } else {
        item.classList.add('text-slate-400');
        item.classList.remove('text-emerald-400', 'text-indigo-400', 'font-semibold', 'font-medium');
        if (icon) icon.innerHTML = '○';
      }
    });
  }

  setTabsLoadingSkeleton(loading) {
    document.querySelectorAll('.tab-skeleton').forEach(el => {
      el.classList.toggle('hidden', !loading);
    });
    document.querySelectorAll('.tab-content-loaded').forEach(el => {
      el.classList.toggle('hidden', loading);
    });
  }

  loadSavedState() {
    if (!this.currentWorkId) return;

    // Load vocab density
    const savedVocab = localStorage.getItem(`sdd_vocab_density_${this.currentWorkId}`);
    if (savedVocab) {
      this.vocabDensity = parseInt(savedVocab, 10);
      const slider = document.getElementById('vocab-density-slider');
      const valLabel = document.getElementById('vocab-density-val');
      if (slider) slider.value = this.vocabDensity;
      if (valLabel) valLabel.textContent = this.vocabDensity;
    }

    // Load highlight filters
    const savedHighlights = localStorage.getItem(`sdd_highlights_${this.currentWorkId}`);
    if (savedHighlights) {
      try {
        this.highlightFilters = JSON.parse(savedHighlights);
        document.querySelectorAll('.highlight-filter-toggle').forEach(cb => {
          const cat = cb.getAttribute('data-category');
          if (cat && this.highlightFilters[cat] !== undefined) {
            cb.checked = this.highlightFilters[cat];
          }
        });
      } catch (e) {}
    }

    // Load quiz selections
    const savedQuiz = localStorage.getItem(`sdd_quiz_${this.currentWorkId}`);
    if (savedQuiz) {
      try {
        this.quizSelections = JSON.parse(savedQuiz);
      } catch (e) {
        this.quizSelections = {};
      }
    } else {
      this.quizSelections = {};
    }
  }

  saveState() {
    if (!this.currentWorkId) return;
    localStorage.setItem(`sdd_vocab_density_${this.currentWorkId}`, this.vocabDensity);
    localStorage.setItem(`sdd_highlights_${this.currentWorkId}`, JSON.stringify(this.highlightFilters));
    localStorage.setItem(`sdd_quiz_${this.currentWorkId}`, JSON.stringify(this.quizSelections));
  }

  renderAll() {
    if (!this.currentWork) return;
    this.renderHeaderInfo();
    this.renderSummaryTab();
    this.renderAnnotatedText();
    this.renderVocabularyTab();
    this.renderStoryMapTab();
    this.renderDeepDiveTab();
    this.renderStudyPrepTab();
  }

  renderHeaderInfo() {
    const work = this.currentWork;
    const titleEl = document.getElementById('header-work-title');
    const authorEl = document.getElementById('header-work-author');
    const printTitleEl = document.getElementById('print-work-title');
    const printAuthorEl = document.getElementById('print-work-author');

    if (titleEl) titleEl.textContent = work.title;
    if (authorEl) authorEl.textContent = work.author ? `by ${work.author}` : '';
    if (printTitleEl) printTitleEl.textContent = work.title;
    if (printAuthorEl) printAuthorEl.textContent = work.author ? `by ${work.author}` : '';

    // Subtle Obscure Notification Banner
    const obscureBanner = document.getElementById('obscure-notice-banner');
    if (obscureBanner) {
      obscureBanner.classList.toggle('hidden', !work.isObscure);
    }
  }

  // ================= TAB 1: SUMMARY & CONTEXT =================
  renderSummaryTab(data = this.currentWork) {
    if (!data) return;

    // Metadata Grid
    const metaAuthor = document.getElementById('meta-author');
    const metaGenre = document.getElementById('meta-genre');
    const metaSetting = document.getElementById('meta-setting');
    const metaPov = document.getElementById('meta-pov');
    const metaConflict = document.getElementById('meta-conflict');
    const metaYear = document.getElementById('meta-year');
    const metaWordCount = document.getElementById('meta-wordcount');
    const metaReadTime = document.getElementById('meta-readtime');
    const toneTagsContainer = document.getElementById('meta-tone-tags');

    if (metaAuthor) metaAuthor.textContent = data.author || 'N/A';
    if (metaGenre) metaGenre.textContent = data.genre || 'Literary Fiction';
    if (metaSetting) metaSetting.textContent = data.setting || 'N/A';
    if (metaPov) metaPov.textContent = data.pov || 'N/A';
    if (metaConflict) metaConflict.textContent = data.conflictType || 'N/A';
    if (metaYear) metaYear.textContent = data.publicationYear || 'N/A';
    if (metaWordCount) metaWordCount.textContent = data.wordCount ? `${data.wordCount.toLocaleString()} words` : 'N/A';
    if (metaReadTime) metaReadTime.textContent = data.estimatedReadTime || '8 min';

    if (toneTagsContainer && data.tone) {
      toneTagsContainer.innerHTML = data.tone.map(t => `
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-indigo-300 border border-slate-700">
          ${t}
        </span>
      `).join('');
    }

    // Plot Summary Cards
    const sumBeg = document.getElementById('summary-beginning');
    const sumMid = document.getElementById('summary-middle');
    const sumEnd = document.getElementById('summary-end');

    if (sumBeg) sumBeg.textContent = data.summary?.beginning || '';
    if (sumMid) sumMid.textContent = data.summary?.middle || '';
    if (sumEnd) sumEnd.textContent = data.summary?.end || '';

    // Historical & Author Context
    const histAuthorBio = document.getElementById('hist-author-bio');
    const histMovement = document.getElementById('hist-literary-movement');
    const histEra = document.getElementById('hist-historical-era');

    if (histAuthorBio) histAuthorBio.textContent = data.historicalContext?.authorBio || '';
    if (histMovement) histMovement.textContent = data.historicalContext?.literaryMovement || '';
    if (histEra) histEra.textContent = data.historicalContext?.historicalEra || '';

    // Compare & Connect Cards
    const compareContainer = document.getElementById('compare-connect-container');
    if (compareContainer && data.compareAndConnect) {
      compareContainer.innerHTML = data.compareAndConnect.map(item => `
        <div class="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 hover:border-indigo-500/50 transition-all">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60">
              ${item.type}
            </span>
          </div>
          <h4 class="text-base font-semibold text-slate-100 mb-2">${item.title}</h4>
          <p class="text-sm text-slate-300 leading-relaxed">${item.connection}</p>
        </div>
      `).join('');
    }
  }

  // ================= TAB 2: ANNOTATED TEXT =================
  renderAnnotatedTextTab(data = this.currentWork) {
    this.renderAnnotatedText(data);
  }

  renderAnnotatedText(data = this.currentWork) {
    if (!data || !data.paragraphs) return;

    const container = document.getElementById('annotated-text-container');
    if (!container) return;

    const activeVocabWords = (data.vocabulary || [])
      .slice(0, this.vocabDensity)
      .map(v => v.word.toLowerCase());

    this.updateHighlightCountBadges(data);

    const paragraphsHtml = data.paragraphs.map(p => {
      let text = p.text;

      // 1. Process Color-Coded Categorized Highlights
      if (p.annotations && p.annotations.length > 0) {
        const sortedAnnotations = [...p.annotations].sort((a, b) => b.phrase.length - a.phrase.length);

        sortedAnnotations.forEach(ann => {
          const isCategoryActive = this.highlightFilters[ann.category] !== false;
          const escapedPhrase = ann.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(${escapedPhrase})`, 'gi');

          const safeNote = ann.note.replace(/"/g, '&quot;');
          const safeDevice = (ann.device || '').replace(/"/g, '&quot;');
          const highlightClass = isCategoryActive ? `hl-${ann.category}` : 'category-hidden';
          
          text = text.replace(regex, `<span class="annotation-highlight ${highlightClass}" data-category="${ann.category}" data-note="${safeNote}" data-device="${safeDevice}" data-phrase="$1">$1</span>`);
        });
      }

      // 2. Process Vocabulary Underlining
      if (activeVocabWords.length > 0) {
        activeVocabWords.forEach(word => {
          const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const vocabRegex = new RegExp(`\\b(${escapedWord})\\b`, 'gi');
          text = text.replace(vocabRegex, (match) => {
            return `<span class="vocab-underline" data-vocab-word="${word.toLowerCase()}" title="Click to view in Vocabulary">${match}</span>`;
          });
        });
      }

      return `
        <div id="para-${p.id}" class="paragraph-block group relative flex items-start gap-4 py-2 hover:bg-slate-800/40 rounded-lg px-3 transition-colors">
          <span class="font-mono text-xs text-slate-500 pt-1 select-none w-6 text-right flex-shrink-0 group-hover:text-indigo-400">
            ${p.number}
          </span>
          <div class="paragraph-content flex-1 font-serif-literary leading-relaxed">
            ${text}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = paragraphsHtml;
    this.attachAnnotatedTextListeners();
  }

  updateHighlightCountBadges(data) {
    const counts = {
      'plot': 0,
      'characters': 0,
      'setting-world': 0,
      'meaning-theme': 0,
      'literary-devices': 0
    };

    if (data && data.paragraphs) {
      data.paragraphs.forEach(p => {
        if (p.annotations) {
          p.annotations.forEach(a => {
            if (counts[a.category] !== undefined) {
              counts[a.category]++;
            }
          });
        }
      });
    }

    for (const [cat, count] of Object.entries(counts)) {
      const badge = document.getElementById(`count-badge-${cat}`);
      if (badge) badge.textContent = count;
    }
  }

  attachAnnotatedTextListeners() {
    const popover = document.getElementById('annotation-popover');
    const popoverCategory = document.getElementById('popover-category');
    const popoverDevice = document.getElementById('popover-device');
    const popoverNote = document.getElementById('popover-note');
    const popoverPhrase = document.getElementById('popover-phrase');

    document.querySelectorAll('.annotation-highlight').forEach(el => {
      const category = el.getAttribute('data-category');
      const isVisible = this.highlightFilters[category] !== false;

      if (!isVisible) return;

      const showPopover = (e) => {
        const note = el.getAttribute('data-note');
        const device = el.getAttribute('data-device');
        const phrase = el.getAttribute('data-phrase');

        if (popoverCategory) {
          popoverCategory.textContent = category.replace('-', ' ').toUpperCase();
          popoverCategory.className = `text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded hl-${category}`;
        }
        if (popoverDevice) popoverDevice.textContent = device || 'Literary Note';
        if (popoverNote) popoverNote.textContent = note;
        if (popoverPhrase) popoverPhrase.textContent = `"${phrase}"`;

        const rect = el.getBoundingClientRect();
        popover.classList.remove('hidden');

        const top = window.scrollY + rect.bottom + 8;
        const left = Math.min(window.innerWidth - 370, Math.max(16, window.scrollX + rect.left));

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
      };

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isPopoverPinned = true;
        showPopover(e);
      });

      el.addEventListener('mouseenter', (e) => {
        if (!this.isPopoverPinned) {
          showPopover(e);
        }
      });
    });

    document.querySelectorAll('.vocab-underline').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = el.getAttribute('data-vocab-word');
        if (word) {
          this.jumpToVocabCard(word);
        }
      });
    });
  }

  jumpToVocabCard(word) {
    this.switchTab('tab-vocab');
    setTimeout(() => {
      const card = document.getElementById(`vocab-card-${word.toLowerCase()}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('ring-2', 'ring-amber-400', 'bg-slate-750');
        setTimeout(() => {
          card.classList.remove('ring-2', 'ring-amber-400', 'bg-slate-750');
        }, 2500);
      } else {
        this.showToast(`Word "${word}" is in the vocabulary database.`);
      }
    }, 180);
  }

  performTextSearch(query) {
    this.searchQuery = query.trim();
    const countEl = document.getElementById('search-match-count');
    
    document.querySelectorAll('.search-match').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });

    if (!this.searchQuery) {
      if (countEl) countEl.textContent = '0 of 0';
      this.searchResults = [];
      this.currentSearchIndex = -1;
      return;
    }

    const container = document.getElementById('annotated-text-container');
    if (!container) return;

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (node.parentElement.closest('#annotation-popover')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    this.searchResults = [];
    const regex = new RegExp(this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

    textNodes.forEach(node => {
      const matches = [...node.textContent.matchAll(regex)];
      if (matches.length > 0) {
        const span = document.createElement('span');
        span.innerHTML = node.textContent.replace(regex, '<span class="search-match">$1</span>');
        node.parentNode.replaceChild(span, node);
      }
    });

    this.searchResults = Array.from(document.querySelectorAll('.search-match'));
    
    if (this.searchResults.length > 0) {
      this.currentSearchIndex = 0;
      this.updateSearchHighlight();
    } else {
      this.currentSearchIndex = -1;
      if (countEl) countEl.textContent = '0 matches';
    }
  }

  navigateSearch(direction) {
    if (this.searchResults.length === 0) return;
    this.currentSearchIndex = (this.currentSearchIndex + direction + this.searchResults.length) % this.searchResults.length;
    this.updateSearchHighlight();
  }

  updateSearchHighlight() {
    const countEl = document.getElementById('search-match-count');
    this.searchResults.forEach((el, idx) => {
      el.classList.toggle('current-search-match', idx === this.currentSearchIndex);
    });

    if (countEl) {
      countEl.textContent = `${this.currentSearchIndex + 1} of ${this.searchResults.length}`;
    }

    if (this.currentSearchIndex >= 0 && this.searchResults[this.currentSearchIndex]) {
      this.searchResults[this.currentSearchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ================= TAB 3: VOCABULARY =================
  renderVocabularyTab(data = this.currentWork) {
    if (!data || !data.vocabulary) return;

    const container = document.getElementById('vocab-card-grid');
    const totalCountEl = document.getElementById('vocab-total-count');
    const visibleCountEl = document.getElementById('vocab-visible-count');

    if (totalCountEl) totalCountEl.textContent = data.vocabulary.length;
    if (visibleCountEl) visibleCountEl.textContent = Math.min(this.vocabDensity, data.vocabulary.length);

    if (!container) return;

    let activeList = data.vocabulary.slice(0, this.vocabDensity);

    if (this.vocabFilterText) {
      activeList = activeList.filter(v => 
        v.word.toLowerCase().includes(this.vocabFilterText) || 
        v.definition.toLowerCase().includes(this.vocabFilterText)
      );
    }

    if (activeList.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-8 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-xl">
          <p class="text-sm">No vocabulary terms match your filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = activeList.map(v => `
      <div id="vocab-card-${v.word.toLowerCase()}" class="vocab-card bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-lg">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 class="text-xl font-bold text-slate-100 capitalize font-serif-literary">${v.word}</h4>
              <span class="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50 inline-block mt-1">
                ${v.pos}
              </span>
            </div>
            ${v.etymology ? `
              <span class="text-xs text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-right">
                ${v.etymology}
              </span>
            ` : ''}
          </div>

          <p class="text-sm text-slate-300 mb-3 leading-relaxed">${v.definition}</p>

          <div class="bg-slate-900/80 rounded-lg p-3 border border-slate-800 mb-3">
            <span class="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">Story Context:</span>
            <p class="text-sm text-slate-300 italic font-serif-literary leading-snug">"${v.sentence}"</p>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-700/60 flex items-center justify-between">
          <span class="text-xs text-slate-400">
            ${v.connotation ? `Tone: <strong class="text-slate-300">${v.connotation}</strong>` : ''}
          </span>
          <button class="jump-to-text-btn text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline cursor-pointer" data-word="${v.word}">
            Find in Text →
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.jump-to-text-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const word = btn.getAttribute('data-word');
        this.jumpToTextWord(word);
      });
    });
  }

  jumpToTextWord(word) {
    this.switchTab('tab-text');
    setTimeout(() => {
      const textSearchInput = document.getElementById('text-search-input');
      if (textSearchInput) {
        textSearchInput.value = word;
        this.performTextSearch(word);
      }
    }, 180);
  }

  // ================= TAB 4: INTERACTIVE STORY MAP =================
  renderStoryMapTab(data = this.currentWork) {
    if (!data || !data.storyMap) return;

    const nodesContainer = document.getElementById('story-map-nodes-container');
    if (!nodesContainer) return;

    nodesContainer.innerHTML = data.storyMap.map((node, index) => {
      return `
        <div class="story-map-node bg-slate-800/90 border border-slate-700 rounded-xl p-4 cursor-pointer hover:border-indigo-500 hover:bg-slate-750 transition-all transform hover:-translate-y-1 shadow-lg group relative flex flex-col justify-between" data-node-id="${node.id}" data-index="${index}">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono uppercase font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/60">
                ${node.stage}
              </span>
              <span class="text-xs font-mono text-rose-400 font-semibold" title="Narrative Tension">
                ⚡ ${node.tension}%
              </span>
            </div>
            <h4 class="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
              ${node.title}
            </h4>
            <p class="text-xs text-slate-400 line-clamp-3 mb-3">
              ${node.summary}
            </p>
          </div>
          
          <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mt-2">
            <div class="bg-gradient-to-r from-indigo-500 to-rose-500 h-1.5 rounded-full" style="width: ${node.tension}%"></div>
          </div>
        </div>
      `;
    }).join('');

    nodesContainer.querySelectorAll('.story-map-node').forEach(nodeEl => {
      nodeEl.addEventListener('click', () => {
        const index = parseInt(nodeEl.getAttribute('data-index'), 10);
        this.openPlotDrawer(data.storyMap[index]);
      });
    });
  }

  openPlotDrawer(node) {
    const drawer = document.getElementById('plot-node-drawer');
    const stageEl = document.getElementById('drawer-node-stage');
    const tensionEl = document.getElementById('drawer-node-tension');
    const titleEl = document.getElementById('drawer-node-title');
    const summaryEl = document.getElementById('drawer-node-summary');
    const quoteEl = document.getElementById('drawer-node-quote');
    const analysisEl = document.getElementById('drawer-node-analysis');
    const jumpBtn = document.getElementById('drawer-jump-quote-btn');

    if (!drawer || !node) return;

    if (stageEl) stageEl.textContent = node.stage;
    if (tensionEl) tensionEl.textContent = `Tension: ${node.tension}%`;
    if (titleEl) titleEl.textContent = node.title;
    if (summaryEl) summaryEl.textContent = node.summary;
    if (quoteEl) quoteEl.textContent = `"${node.quote}"`;
    if (analysisEl) analysisEl.textContent = node.analysis;

    if (jumpBtn) {
      jumpBtn.onclick = () => {
        this.closePlotDrawer();
        this.jumpToStoryQuote(node.quoteLocation, node.quote);
      };
    }

    drawer.classList.remove('closed');
    drawer.classList.add('open');
  }

  closePlotDrawer() {
    const drawer = document.getElementById('plot-node-drawer');
    if (drawer) {
      drawer.classList.add('closed');
      drawer.classList.remove('open');
    }
  }

  jumpToStoryQuote(paragraphId, quoteText) {
    this.switchTab('tab-text');
    setTimeout(() => {
      let targetEl = null;
      if (paragraphId) {
        targetEl = document.getElementById(`para-${paragraphId}`);
      }
      if (!targetEl && quoteText) {
        const textContainer = document.getElementById('annotated-text-container');
        const paras = textContainer ? textContainer.querySelectorAll('.paragraph-block') : [];
        for (const p of paras) {
          if (p.textContent.includes(quoteText.substring(0, 30))) {
            targetEl = p;
            break;
          }
        }
      }

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('pulse-quote-target');
        setTimeout(() => {
          targetEl.classList.remove('pulse-quote-target');
        }, 2800);
      } else {
        this.showToast('Navigated to text.');
      }
    }, 200);
  }

  // ================= TAB 5: DEEP DIVE (ORG CHART) =================
  renderDeepDiveTab(data = this.currentWork) {
    if (!data || !data.deepDive) return;

    const orgRootTitle = document.getElementById('org-root-work-title');
    if (orgRootTitle) orgRootTitle.textContent = data.title;

    document.querySelectorAll('.org-node-card').forEach(card => {
      card.addEventListener('click', () => {
        const nodeId = card.getAttribute('data-node-id');
        if (nodeId && data.deepDive[nodeId]) {
          this.openDeepDiveSubNode(nodeId, data.deepDive[nodeId]);
        }
      });
    });
  }

  showOrgChartMain() {
    this.activeSubNodeId = null;
    const orgChartContainer = document.getElementById('org-chart-main-view');
    const subnodeView = document.getElementById('subnode-detail-view');

    if (orgChartContainer) orgChartContainer.classList.remove('hidden');
    if (subnodeView) subnodeView.classList.add('hidden');
  }

  openDeepDiveSubNode(nodeId, nodeData) {
    this.activeSubNodeId = nodeId;
    const orgChartContainer = document.getElementById('org-chart-main-view');
    const subnodeView = document.getElementById('subnode-detail-view');

    if (orgChartContainer) orgChartContainer.classList.add('hidden');
    if (subnodeView) subnodeView.classList.remove('hidden');

    const titleEl = document.getElementById('subnode-title');
    const subtitleEl = document.getElementById('subnode-subtitle');
    const summaryEl = document.getElementById('subnode-summary');
    const pointsContainer = document.getElementById('subnode-key-points');
    const quotesContainer = document.getElementById('subnode-pull-quotes');
    const notesTextarea = document.getElementById('subnode-notes-textarea');
    const notesSaveIndicator = document.getElementById('notes-save-indicator');

    if (titleEl) titleEl.textContent = nodeData.title;
    if (subtitleEl) subtitleEl.textContent = nodeData.subtitle || '';
    if (summaryEl) summaryEl.textContent = nodeData.summary;

    if (pointsContainer && nodeData.keyPoints) {
      pointsContainer.innerHTML = nodeData.keyPoints.map(pt => `
        <li class="text-sm text-slate-300 leading-relaxed flex items-start gap-2">
          <span class="text-indigo-400 font-bold mt-0.5">▪</span>
          <div>${pt.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100">$1</strong>')}</div>
        </li>
      `).join('');
    }

    if (quotesContainer && nodeData.pullQuotes) {
      quotesContainer.innerHTML = nodeData.pullQuotes.map(q => `
        <div class="bg-slate-900/80 border-l-4 border-indigo-500 p-4 rounded-r-xl">
          <p class="font-serif-literary text-base text-slate-200 italic mb-2">"${q.quote}"</p>
          <p class="text-xs text-slate-400 font-sans"><strong class="text-indigo-300">Literary Significance:</strong> ${q.significance}</p>
        </div>
      `).join('');
    }

    const savedNotes = localStorage.getItem(`sdd_notes_${this.currentWorkId}_${nodeId}`) || '';
    if (notesTextarea) notesTextarea.value = savedNotes;
    if (notesSaveIndicator) notesSaveIndicator.textContent = savedNotes ? 'Saved in LocalStorage' : '';
  }

  handleNotesInput(content) {
    if (!this.activeSubNodeId || !this.currentWorkId) return;

    const indicator = document.getElementById('notes-save-indicator');
    if (indicator) indicator.textContent = 'Saving...';

    clearTimeout(this.notesDebounceTimer);
    this.notesDebounceTimer = setTimeout(() => {
      localStorage.setItem(`sdd_notes_${this.currentWorkId}_${this.activeSubNodeId}`, content);
      if (indicator) indicator.textContent = 'All changes saved locally!';
      setTimeout(() => {
        if (indicator) indicator.textContent = 'Saved in LocalStorage';
      }, 1800);
    }, 450);
  }

  // ================= TAB 6: STUDY & PREP =================
  renderStudyPrepTab(data = this.currentWork) {
    if (!data || !data.studyPrep) return;

    // 1. Essay Angles & Thesis Generator
    const thesisContainer = document.getElementById('thesis-angles-container');
    if (thesisContainer && data.studyPrep.essayAngles) {
      thesisContainer.innerHTML = data.studyPrep.essayAngles.map((angle, idx) => `
        <div class="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-md">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50">
                Prompt ${idx + 1}
              </span>
            </div>
            <h4 class="text-base font-semibold text-slate-100 mb-3">${angle.prompt}</h4>
            
            <div class="bg-slate-900/90 rounded-lg p-3.5 border border-slate-800 mb-3">
              <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Customizable Thesis Template:
              </span>
              <p class="text-sm font-serif-literary text-indigo-200 leading-relaxed thesis-text">
                ${angle.thesisTemplate.replace(/\[(.*?)\]/g, '<span class="bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-700 text-amber-300 font-mono text-xs">[$1]</span>')}
              </p>
            </div>
          </div>

          <button class="copy-thesis-btn w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer" data-thesis="${encodeURIComponent(angle.thesisTemplate)}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
            <span>Copy Template</span>
          </button>
        </div>
      `).join('');

      thesisContainer.querySelectorAll('.copy-thesis-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const rawThesis = decodeURIComponent(btn.getAttribute('data-thesis'));
          navigator.clipboard.writeText(rawThesis);
          this.showToast('Thesis template copied to clipboard!');
        });
      });
    }

    // 2. Critical Thinking Section
    const criticalContainer = document.getElementById('critical-thinking-container');
    if (criticalContainer && data.studyPrep.criticalThinking) {
      criticalContainer.innerHTML = data.studyPrep.criticalThinking.map((item, idx) => `
        <div class="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 hover:border-slate-600 transition-all">
          <div class="flex items-start justify-between gap-4 mb-3">
            <h4 class="text-base font-semibold text-slate-100 flex-1">
              <span class="text-indigo-400 mr-2 font-mono">Q${idx + 1}.</span>${item.question}
            </h4>
            <button class="reveal-answer-btn text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-300 border border-indigo-700/60 transition-colors flex-shrink-0 cursor-pointer" data-target="crit-ans-${idx}">
              Reveal AI Answer
            </button>
          </div>

          <div id="crit-ans-${idx}" class="hidden mt-3 p-4 bg-slate-900/90 rounded-lg border border-slate-700/80 text-sm text-slate-200 leading-relaxed animate-fade">
            <div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <span>✓ AI Model Answer & Analysis</span>
            </div>
            <p>${item.answer}</p>
          </div>
        </div>
      `).join('');

      criticalContainer.querySelectorAll('.reveal-answer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-target');
          const ansEl = document.getElementById(targetId);
          if (ansEl) {
            const isHidden = ansEl.classList.contains('hidden');
            ansEl.classList.toggle('hidden', !isHidden);
            btn.textContent = isHidden ? 'Hide Answer' : 'Reveal AI Answer';
          }
        });
      });
    }

    // 3. Interactive Quiz
    this.renderQuiz(data.studyPrep.quiz);
  }

  renderQuiz(quizQuestions) {
    const quizContainer = document.getElementById('quiz-questions-container');
    const scoreContainer = document.getElementById('quiz-score-container');
    const scoreVal = document.getElementById('quiz-score-val');

    if (!quizContainer || !quizQuestions) return;

    let correctCount = 0;
    const answeredCount = Object.keys(this.quizSelections).length;

    quizContainer.innerHTML = quizQuestions.map((q, qIndex) => {
      const userChoice = this.quizSelections[q.id];
      const isAnswered = userChoice !== undefined;
      const isCorrect = isAnswered && userChoice === q.correctIndex;
      if (isCorrect) correctCount++;

      return `
        <div class="quiz-card bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 mb-4 shadow-md" data-qid="${q.id}">
          <div class="flex items-start justify-between gap-2 mb-3">
            <h4 class="text-base font-semibold text-slate-100">
              <span class="text-indigo-400 font-mono mr-2">${qIndex + 1}.</span>${q.question}
            </h4>
          </div>

          <div class="space-y-2 mb-3">
            ${q.options.map((opt, optIdx) => {
              let btnClass = "bg-slate-900/80 hover:bg-slate-700/80 border-slate-800 text-slate-300";
              
              if (isAnswered) {
                if (optIdx === q.correctIndex) {
                  btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium ring-1 ring-emerald-500";
                } else if (optIdx === userChoice && !isCorrect) {
                  btnClass = "bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500";
                } else {
                  btnClass = "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60";
                }
              }

              return `
                <button class="quiz-option-btn w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}" data-qid="${q.id}" data-opt-idx="${optIdx}">
                  <span>${opt}</span>
                  ${isAnswered && optIdx === q.correctIndex ? '<span class="text-emerald-400 font-bold ml-2">✓ Correct</span>' : ''}
                  ${isAnswered && optIdx === userChoice && !isCorrect ? '<span class="text-rose-400 font-bold ml-2">✗ Incorrect</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>

          ${isAnswered ? `
            <div class="p-3 bg-slate-900/90 rounded-lg border ${isCorrect ? 'border-emerald-800/60' : 'border-rose-800/60'} text-xs text-slate-300">
              <strong class="${isCorrect ? 'text-emerald-400' : 'text-rose-400'} block mb-1">
                ${isCorrect ? 'Great job!' : 'Explanation:'}
              </strong>
              ${q.explanation}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    if (scoreContainer && scoreVal) {
      scoreContainer.classList.toggle('hidden', answeredCount === 0);
      scoreVal.textContent = `${correctCount} / ${quizQuestions.length} (${Math.round((correctCount / quizQuestions.length) * 100)}%)`;
    }

    quizContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const optIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        this.handleQuizAnswer(qid, optIdx);
      });
    });
  }

  handleQuizAnswer(questionId, optionIndex) {
    this.quizSelections[questionId] = optionIndex;
    this.saveState();
    if (this.currentWork?.studyPrep?.quiz) {
      this.renderQuiz(this.currentWork.studyPrep.quiz);
    }
  }

  regenerateQuiz() {
    this.quizSelections = {};
    this.saveState();
    this.showToast('Quiz reset. Ready for another attempt!');

    if (this.currentWork?.studyPrep?.quiz) {
      this.renderQuiz(this.currentWork.studyPrep.quiz);
    }
  }

  showToast(message) {
    const toast = document.getElementById('app-toast');
    const toastMsg = document.getElementById('app-toast-message');
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.remove('hidden', 'translate-y-8', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.add('translate-y-8', 'opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
      }, 3200);
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.storyDeepDive = new StoryDeepDiveApp();
});
