import { useState, useRef } from 'react';
import { ticketService } from '@/modules/tickets/services/ticketService';
import { 
  Upload, FileText, Loader2, Info, 
  MapPin, Home, Image as ImageIcon, IndianRupee, AlignLeft, Plus, Trash2
} from 'lucide-react';
import { toast } from 'sonner';

export default function DataUpload() {
  // Property Details
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [price, setPrice] = useState('');

  // Location
  const [location, setLocation] = useState({
    city: '',
    locality: '',
    address: '',
    pinCode: '',
    mapsLink: ''
  });

  // Media
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Description & Bulk
  const [description, setDescription] = useState('');
  const [datasetFile, setDatasetFile] = useState<File | null>(null);

  // Status
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLocationChange = (field: string, value: string) => {
    setLocation(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (images.length + selectedFiles.length > 10) {
      toast.error('Maximum 10 images allowed per property.');
      return;
    }

    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    selectedFiles.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit.`);
        return;
      }
      newImages.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['text/csv', 'application/json', 'text/plain', 'application/octet-stream'];
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!validTypes.includes(selectedFile.type) && !['csv', 'json', 'txt'].includes(extension || '')) {
        toast.error('Invalid format. Use CSV, JSON, or TXT.');
        return;
      }
      setDatasetFile(selectedFile);
    }
  };

  const validate = () => {
    if (!title) return 'Property Title is mandatory.';
    if (!price || isNaN(Number(price))) return 'Valid Price is required.';
    if (!location.city || !location.address) return 'City and Address are required.';
    if (images.length === 0) return 'At least 1 property image is required.';
    if (description.length > 1000) return 'Description exceeds 1000 characters.';
    return null;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('propertyType', propertyType);
    formData.append('price', price);
    formData.append('city', location.city);
    formData.append('locality', location.locality);
    formData.append('address', location.address);
    formData.append('pinCode', location.pinCode);
    formData.append('mapsLink', location.mapsLink);
    formData.append('description', description);
    
    images.forEach(img => formData.append('images', img));
    if (datasetFile) formData.append('file', datasetFile);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => prev < 90 ? prev + (90 - prev) * 0.1 : prev);
    }, 300);

    try {
      const res = await ticketService.uploadData(formData);
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (res.success) {
        toast.success('Upload successful');
        // Reset form
        setTitle('');
        setPrice('');
        setLocation({ city: '', locality: '', address: '', pinCode: '', mapsLink: '' });
        setImages([]);
        setImagePreviews([]);
        setDescription('');
        setDatasetFile(null);
      } else {
        toast.error(res.error || 'System failed to register property');
      }
    } catch (err) {
      clearInterval(progressInterval);
      toast.error('Network synchronization failure');
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase tracking-tighter">Property Ingestion</h1>
          <p className="text-sm text-white/40 uppercase tracking-[0.2em] font-bold pl-0.5">Publish new listings to the network</p>
        </div>
      </header>

      <form onSubmit={handleUpload} className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Core Data */}
        <div className="space-y-8">
          {/* Section 1: Property Details */}
          <section className="p-10 rounded-[3rem] glass-dark border border-white/5 space-y-8 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="flex items-center gap-4 text-white/40 mb-2">
               <Home size={20} className="group-hover:text-white transition-colors" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Property Fundamentals</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Property Title *</label>
                <input 
                  type="text" 
                  placeholder="E.g. Sobha Royal Pavilion 3BHK"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Property Type</label>
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Apartment" className="bg-slate-900">Apartment</option>
                    <option value="Villa" className="bg-slate-900">Villa</option>
                    <option value="Plot" className="bg-slate-900">Plot</option>
                    <option value="Commercial" className="bg-slate-900">Commercial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Price *</label>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                       <IndianRupee size={14} className="text-white/20" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="95000000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Location */}
          <section className="p-10 rounded-[3rem] glass-dark border border-white/5 space-y-8 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="flex items-center gap-4 text-white/40 mb-2">
               <MapPin size={20} className="group-hover:text-white transition-colors" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Spatial Intelligence</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">City *</label>
                <input 
                  type="text" 
                  placeholder="Bangalore"
                  value={location.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Area / Locality</label>
                <input 
                  type="text" 
                  placeholder="Sarjapur Road"
                  value={location.locality}
                  onChange={(e) => handleLocationChange('locality', e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Full Address *</label>
              <textarea 
                rows={2}
                placeholder="Building Name, Wing, Flat Number..."
                value={location.address}
                onChange={(e) => handleLocationChange('address', e.target.value)}
                className="w-full px-6 py-4 rounded-3xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all resize-none placeholder:text-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Pin Code</label>
                  <input 
                    type="text" 
                    placeholder="560102"
                    value={location.pinCode}
                    onChange={(e) => handleLocationChange('pinCode', e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Google Maps Link</label>
                  <input 
                    type="url" 
                    placeholder="https://maps.app.goo.gl/..."
                    value={location.mapsLink}
                    onChange={(e) => handleLocationChange('mapsLink', e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                  />
               </div>
            </div>
          </section>
        </div>

        {/* Right Column: Media & Description */}
        <div className="space-y-8">
           {/* Section 3: Media */}
           <section className="p-10 rounded-[3rem] glass-dark border border-white/5 space-y-8 relative overflow-hidden group hover:border-white/10 transition-all">
             <div className="flex items-center gap-4 text-white/40 mb-2">
                <ImageIcon size={20} className="group-hover:text-white transition-colors" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Property Visuals</h3>
             </div>

             <div className="space-y-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-40 rounded-[2.5rem] border-2 border-dashed border-white/5 bg-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/[0.08] hover:border-white/10 transition-all"
                >
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20">
                      <Plus size={24} />
                   </div>
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Click to upload property gallery</p>
                   <p className="text-[9px] text-white/10 uppercase font-black">Max 10 Images (10MB Each)</p>
                   <input 
                     type="file" 
                     multiple 
                     accept="image/*"
                     ref={fileInputRef}
                     onChange={handleImageChange}
                     className="hidden"
                   />
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {imagePreviews.map((url, i) => (
                      <div key={i} className="relative group/img aspect-square rounded-2xl overflow-hidden border border-white/10">
                        <img src={url} className="w-full h-full object-cover" alt="Preview" />
                        <button 
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity text-white"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
             </div>
           </section>

           {/* Section 4: Description */}
           <section className="p-10 rounded-[3rem] glass-dark border border-white/5 space-y-8 relative overflow-hidden group hover:border-white/10 transition-all">
             <div className="flex items-center gap-4 text-white/40 mb-2">
                <AlignLeft size={20} className="group-hover:text-white transition-colors" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Contextual Description</h3>
             </div>

             <div className="space-y-4">
               <textarea 
                 rows={5}
                 placeholder="Detail the unique selling points, amenities, and connectivity context..."
                 value={description}
                 onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
                 className="w-full px-6 py-4 rounded-[2rem] bg-white/5 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-white/20 transition-all resize-none placeholder:text-white/10 leading-relaxed"
               />
               <div className="flex justify-end">
                 <span className={`text-[10px] font-black uppercase tracking-widest ${description.length >= 1000 ? 'text-red-400' : 'text-white/20'}`}>
                    {description.length} / 1000 characters
                 </span>
               </div>
             </div>
           </section>

           {/* Section 5: Optional Bulk Dataset */}
           <section className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white/20 uppercase tracking-widest">
                   <Info size={16} />
                   <h4 className="text-[10px] font-black">Bulk Data Sync (Optional)</h4>
                </div>
                {datasetFile && (
                  <button 
                    type="button" 
                    onClick={() => setDatasetFile(null)}
                    className="text-[9px] font-black text-red-500/50 uppercase hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
             </div>
             
             {!datasetFile ? (
               <div className="relative h-20 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center group hover:bg-white/5 transition-all">
                  <Upload size={18} className="text-white/20 mr-3" />
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Upload CSV / JSON Dataset</p>
                  <input 
                    type="file" 
                    accept=".csv,.json,.txt"
                    onChange={handleBulkFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
               </div>
             ) : (
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-tight truncate max-w-[200px]">{datasetFile.name}</p>
                    <p className="text-[9px] text-white/20 font-bold uppercase">Ready for companion sync</p>
                  </div>
               </div>
             )}
           </section>

           {/* Submit Action */}
           <div className="pt-4">
             <button 
               type="submit" 
               disabled={isUploading}
               className="w-full py-6 rounded-[2rem] bg-white text-black font-black text-sm uppercase tracking-[0.3em] hover:bg-emerald-400 transition-all disabled:opacity-20 disabled:grayscale relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] group"
             >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-4">
                    <Loader2 size={24} className="animate-spin" />
                    <span>PROCESSING DATA {Math.round(uploadProgress)}%</span>
                    <div className="absolute bottom-0 left-0 h-1.5 bg-black/20 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>UPLOAD PROPERTY DATA</span>
                    <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                  </div>
                )}
             </button>
             <p className="text-center mt-6 text-[9px] font-bold text-white/10 uppercase tracking-[0.2em]">
                Verified data will be indexed for search and lead matching.
             </p>
           </div>
        </div>
      </form>
    </div>
  );
}
